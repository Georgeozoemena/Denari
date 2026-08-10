import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Colors, Elevation, FontWeight, IconSize, Layout, Radius, Spacing, Typography } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import type { Budget } from '@/types';
import { formatCurrency, formatCurrencyFull } from '@/utils/currency';

const CARD_WIDTH = Dimensions.get('window').width * 0.72;
const CARD_MARGIN = 8;
const INITIAL_LOAD = 6;
const LOAD_MORE_BATCH = 6;

export default function BudgetsScreen() {
  const router = useRouter();
  const colors = Colors.light;
  const { budgets, user } = useApp();
  const cardBorder = { borderWidth: 1, borderColor: colors.border };

  const userCurrency = user?.currency || 'NGN';
  const currentMonth = new Date().toISOString().slice(0, 7);

  const sortedBudgets = useMemo(
    () => [...budgets].sort((a, b) => b.month.localeCompare(a.month)),
    [budgets],
  );

  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
  const displayedBudgets = sortedBudgets.slice(0, visibleCount);

  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(
    sortedBudgets.find((b) => b.month === currentMonth)?.id || sortedBudgets[0]?.id || null,
  );
  const selectedBudget = sortedBudgets.find((b) => b.id === selectedBudgetId);

  const totalAllocated = selectedBudget?.categories.reduce((sum, cat) => sum + cat.allocated, 0) || 0;
  const totalSpent = selectedBudget?.categories.reduce((sum, cat) => sum + cat.spent, 0) || 0;
  const percentageSpent = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0;

  const flatListRef = useRef<FlatList<Budget>>(null);

  const handleLoadMore = useCallback(() => {
    if (visibleCount < sortedBudgets.length) {
      setVisibleCount((prev) => Math.min(prev + LOAD_MORE_BATCH, sortedBudgets.length));
    }
  }, [visibleCount, sortedBudgets.length]);

  const formatMonthName = (monthStr: string) =>
    new Date(`${monthStr}-01`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  const formatMonthNameLong = (monthStr: string) =>
    new Date(`${monthStr}-01`).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const getProgressColor = (spent: number, allocated: number) => {
    const percentage = allocated > 0 ? (spent / allocated) * 100 : 0;
    if (percentage >= 100) return colors.error;
    if (percentage >= 80) return colors.warning;
    return colors.income;
  };

  const isCurrentMonth = (monthStr: string) => monthStr === currentMonth;
  const isPastMonth = (monthStr: string) => monthStr < currentMonth;

  const renderBudgetCard = ({ item }: { item: Budget }) => {
    const isCurrent = isCurrentMonth(item.month);
    const isSelected = item.id === selectedBudgetId;
    const cardAllocated = item.categories.reduce((sum, cat) => sum + cat.allocated, 0);
    const cardSpent = item.categories.reduce((sum, cat) => sum + cat.spent, 0);
    const cardPercentage = cardAllocated > 0 ? (cardSpent / cardAllocated) * 100 : 0;

    return (
      <Pressable
        onPress={() => setSelectedBudgetId(item.id)}
        style={[
          styles.budgetPeriodCard,
          cardBorder,
          {
            backgroundColor: colors.backgroundElevated,
            borderColor: isSelected ? colors.primary : colors.border,
            borderWidth: isSelected ? 2 : 1,
          },
          Elevation.soft,
        ]}>
        {isCurrent && (
          <View style={[styles.currentStrip, { backgroundColor: colors.primary }]}>
            <Text style={styles.currentStripText}>Current</Text>
          </View>
        )}

        <Text style={[styles.budgetCardMonth, { color: colors.text }]}>{formatMonthName(item.month)}</Text>

        <View style={styles.budgetCardStats}>
          <View>
            <Text style={[styles.budgetCardLabel, { color: colors.textSecondary }]}>Spent</Text>
            <Text style={[styles.budgetCardAmount, { color: colors.text }]}>
              {formatCurrency(cardSpent, userCurrency)}
            </Text>
          </View>
          <View style={styles.budgetCardStatsRight}>
            <Text style={[styles.budgetCardLabel, { color: colors.textSecondary }]}>Budget</Text>
            <Text style={[styles.budgetCardAmount, { color: colors.text }]}>
              {formatCurrency(cardAllocated, userCurrency)}
            </Text>
          </View>
        </View>

        <View style={[styles.budgetCardProgressBar, { backgroundColor: colors.borderLight }]}>
          <View
            style={[
              styles.budgetCardProgressFill,
              {
                width: `${Math.min(cardPercentage, 100)}%`,
                backgroundColor: getProgressColor(cardSpent, cardAllocated),
              },
            ]}
          />
        </View>

        <Text style={[styles.budgetCardPercentage, { color: colors.textSecondary }]}>
          {cardPercentage.toFixed(0)}% used
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundSubtle }]}>
      <View style={styles.topSection}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Budgets</Text>
          <Pressable
            onPress={() => router.push('/create-budget')}
            style={[styles.headerIconButton, cardBorder, { backgroundColor: colors.primary }]}>
            <Ionicons name="add" size={IconSize.lg} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>

      {sortedBudgets.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={[styles.emptyCard, cardBorder, { backgroundColor: colors.backgroundElevated }]}>
            <EmptyState
              icon="wallet-outline"
              title="No Budget Yet"
              message="Create a budget to track your spending and stay on top of your finances."
            />
            <Button
              title="Create Budget"
              onPress={() => router.push('/create-budget')}
              style={styles.createButton}
            />
          </View>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <View style={styles.budgetCardsSection}>
            <FlatList
              ref={flatListRef}
              data={displayedBudgets}
              renderItem={renderBudgetCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
              decelerationRate="fast"
              contentContainerStyle={styles.budgetCardsList}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
            />

            <View style={styles.paginationContainer}>
              <Text style={[styles.paginationText, { color: colors.textSecondary }]}>
                Showing {displayedBudgets.length} of {sortedBudgets.length} budgets
              </Text>
              {visibleCount < sortedBudgets.length && (
                <Pressable onPress={handleLoadMore}>
                  <Text style={[styles.loadMoreText, { color: colors.primary }]}>Load more</Text>
                </Pressable>
              )}
            </View>
          </View>

          {selectedBudget && (
            <ScrollView style={styles.detailsScrollView} contentContainerStyle={styles.detailsContent}>
              {/* Split overview card */}
              <View style={[styles.overviewWrapper, cardBorder, Elevation.card]}>
                <LinearGradient
                  colors={[colors.primary, colors.primaryHover]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.overviewTop}>
                  <View style={styles.overviewTopHeader}>
                    <View>
                      <Text style={styles.overviewTopLabel}>Monthly Budget</Text>
                      <Text style={styles.overviewTopMonth}>{formatMonthNameLong(selectedBudget.month)}</Text>
                    </View>
                    {!isPastMonth(selectedBudget.month) && (
                      <Pressable
                        onPress={() => router.push('/create-budget')}
                        style={styles.editButton}>
                        <Ionicons name="create-outline" size={IconSize.sm} color={colors.primary} />
                      </Pressable>
                    )}
                  </View>
                  <Text style={styles.overviewTopAmount}>
                    {formatCurrencyFull(totalSpent, userCurrency)}
                  </Text>
                  <Text style={styles.overviewTopSubtext}>
                    of {formatCurrency(totalAllocated, userCurrency)} allocated
                  </Text>
                </LinearGradient>

                <View style={[styles.overviewBottom, { backgroundColor: colors.backgroundElevated }]}>
                  <View style={styles.overviewRow}>
                    <View style={styles.overviewItem}>
                      <Text style={[styles.overviewLabel, { color: colors.textSecondary }]}>Allocated</Text>
                      <Text style={[styles.overviewAmount, { color: colors.text }]}>
                        {formatCurrency(totalAllocated, userCurrency)}
                      </Text>
                    </View>
                    <View style={[styles.overviewDivider, { backgroundColor: colors.borderLight }]} />
                    <View style={styles.overviewItem}>
                      <Text style={[styles.overviewLabel, { color: colors.textSecondary }]}>Remaining</Text>
                      <Text style={[styles.overviewAmount, { color: colors.income }]}>
                        {formatCurrency(totalAllocated - totalSpent, userCurrency)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.progressSection}>
                    <View style={styles.progressHeader}>
                      <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>Overall Progress</Text>
                      <Text style={[styles.progressPercent, { color: colors.text }]}>
                        {percentageSpent.toFixed(0)}%
                      </Text>
                    </View>
                    <View style={[styles.progressBar, { backgroundColor: colors.borderLight }]}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${Math.min(percentageSpent, 100)}%`,
                            backgroundColor: getProgressColor(totalSpent, totalAllocated),
                          },
                        ]}
                      />
                    </View>
                  </View>

                  {selectedBudget.monthlyIncome > 0 && (
                    <View style={[styles.incomeRow, { backgroundColor: colors.incomeSoft }]}>
                      <View style={styles.incomeLeft}>
                        <View style={[styles.incomeIcon, { backgroundColor: colors.income }]}>
                          <Ionicons name="trending-up" size={14} color="#FFFFFF" />
                        </View>
                        <Text style={[styles.incomeLabel, { color: colors.income }]}>Monthly Income</Text>
                      </View>
                      <Text style={[styles.incomeAmount, { color: colors.income }]}>
                        {formatCurrency(selectedBudget.monthlyIncome, userCurrency)}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Categories */}
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Category Budgets</Text>

              {selectedBudget.categories.map((category) => {
                const percentage =
                  category.allocated > 0 ? (category.spent / category.allocated) * 100 : 0;
                const progressColor = getProgressColor(category.spent, category.allocated);
                const remaining = category.allocated - category.spent;

                return (
                  <View
                    key={category.id}
                    style={[styles.categoryCard, cardBorder, { backgroundColor: colors.backgroundElevated }]}>
                    <View style={styles.categoryHeader}>
                      <View style={styles.categoryLeft}>
                        <View
                          style={[
                            styles.categoryIcon,
                            { backgroundColor: category.color ? `${category.color}22` : colors.primarySoft },
                          ]}>
                          <Ionicons
                            name={(category.icon as any) || 'pricetag'}
                            size={IconSize.md}
                            color={category.color || colors.primary}
                          />
                        </View>
                        <View>
                          <Text style={[styles.categoryName, { color: colors.text }]}>{category.name}</Text>
                          <Text style={[styles.categoryAmount, { color: colors.textSecondary }]}>
                            {formatCurrency(category.spent, userCurrency)} of{' '}
                            {formatCurrency(category.allocated, userCurrency)}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.categoryRight}>
                        <Text
                          style={[
                            styles.remainingAmount,
                            { color: remaining >= 0 ? colors.income : colors.error },
                          ]}>
                          {remaining >= 0 ? '+' : ''}
                          {formatCurrency(remaining, userCurrency)}
                        </Text>
                        <Text style={[styles.remainingLabel, { color: colors.textSecondary }]}>remaining</Text>
                      </View>
                    </View>

                    <View style={styles.categoryProgress}>
                      <View style={[styles.progressBar, { backgroundColor: colors.borderLight, flex: 1 }]}>
                        <View
                          style={[
                            styles.progressFill,
                            {
                              width: `${Math.min(percentage, 100)}%`,
                              backgroundColor: progressColor,
                            },
                          ]}
                        />
                      </View>
                      <Text style={[styles.categoryPercent, { color: colors.textSecondary }]}>
                        {percentage.toFixed(0)}%
                      </Text>
                    </View>
                  </View>
                );
              })}

              {isPastMonth(selectedBudget.month) && (
                <View style={[styles.viewOnlyNotice, { backgroundColor: colors.primarySoft }]}>
                  <Ionicons name="lock-closed" size={IconSize.sm} color={colors.primary} />
                  <Text style={[styles.viewOnlyText, { color: colors.primary }]}>
                    This is a past budget and cannot be edited
                  </Text>
                </View>
              )}

              <View style={{ height: 100 }} />
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topSection: {
    paddingHorizontal: Layout.screenPadding,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  title: { ...Typography.heading },
  headerIconButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...Elevation.soft,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Layout.screenPadding,
  },
  emptyCard: {
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    ...Elevation.soft,
  },
  createButton: { marginTop: Spacing.xl },
  contentContainer: { flex: 1 },
  budgetCardsSection: { paddingBottom: Spacing.md },
  budgetCardsList: { paddingHorizontal: Layout.screenPadding },
  budgetPeriodCard: {
    width: CARD_WIDTH,
    marginHorizontal: CARD_MARGIN,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  currentStrip: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderBottomLeftRadius: Radius.sm,
  },
  currentStripText: {
    fontSize: 11,
    fontWeight: FontWeight.semibold,
    color: '#FFFFFF',
  },
  budgetCardMonth: {
    fontSize: 18,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.md,
  },
  budgetCardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  budgetCardStatsRight: { alignItems: 'flex-end' },
  budgetCardLabel: { ...Typography.small, marginBottom: 4 },
  budgetCardAmount: { fontSize: 16, fontWeight: FontWeight.semibold },
  budgetCardProgressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  budgetCardProgressFill: { height: '100%', borderRadius: 3 },
  budgetCardPercentage: { ...Typography.small, textAlign: 'center' },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.screenPadding,
    paddingTop: Spacing.sm,
  },
  paginationText: { ...Typography.small },
  loadMoreText: { ...Typography.small, fontWeight: FontWeight.semibold },
  detailsScrollView: { flex: 1 },
  detailsContent: {
    paddingHorizontal: Layout.screenPadding,
    gap: Spacing.md,
  },
  overviewWrapper: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
  },
  overviewTop: { padding: Spacing.xl },
  overviewTopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  overviewTopLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 4,
  },
  overviewTopMonth: {
    fontSize: 18,
    fontWeight: FontWeight.bold,
    color: '#FFFFFF',
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overviewTopAmount: {
    ...Typography.display,
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  overviewTopSubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
  },
  overviewBottom: { padding: Spacing.lg },
  overviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  overviewItem: { flex: 1, alignItems: 'center' },
  overviewDivider: { width: 1, height: 36 },
  overviewLabel: { ...Typography.small, marginBottom: 4 },
  overviewAmount: { fontSize: 16, fontWeight: FontWeight.bold },
  progressSection: { marginBottom: Spacing.md },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  progressLabel: { ...Typography.small },
  progressPercent: { fontSize: 15, fontWeight: FontWeight.semibold },
  progressBar: { height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  incomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderRadius: Radius.md,
  },
  incomeLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  incomeIcon: {
    width: 28,
    height: 28,
    borderRadius: Radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  incomeLabel: { fontSize: 14, fontWeight: FontWeight.semibold },
  incomeAmount: { fontSize: 16, fontWeight: FontWeight.bold },
  sectionTitle: {
    ...Typography.title,
    fontSize: 18,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  categoryCard: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    ...Elevation.soft,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    ...Typography.body,
    fontWeight: FontWeight.semibold,
    marginBottom: 2,
  },
  categoryAmount: { ...Typography.small },
  categoryRight: { alignItems: 'flex-end' },
  remainingAmount: { fontSize: 16, fontWeight: FontWeight.bold, marginBottom: 2 },
  remainingLabel: { ...Typography.small },
  categoryProgress: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  categoryPercent: { ...Typography.small, fontWeight: FontWeight.semibold, minWidth: 40, textAlign: 'right' },
  viewOnlyNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    marginTop: Spacing.sm,
  },
  viewOnlyText: { flex: 1, ...Typography.caption, fontWeight: FontWeight.semibold },
});
