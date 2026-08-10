import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { ProgressiveSetup } from '@/components/progressive-setup';
import { Colors, Elevation, FontWeight, IconSize, Layout, Radius, Spacing, Typography } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { formatCurrency, formatCurrencyFull } from '@/utils/currency';

export default function HomeScreen() {
  const router = useRouter();
  const colors = Colors.light;
  const { user, wallets, transactions, budgets, savingsGoals } = useApp();

  const userCurrency = user?.currency || 'NGN';
  const [feedPeriod, setFeedPeriod] = useState<'daily' | 'monthly'>('monthly');
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('feedPeriod').then((saved: string | null) => {
      if (saved === 'daily' || saved === 'monthly') {
        setFeedPeriod(saved);
      }
    });
  }, []);

  const toggleFeedPeriod = (period: 'daily' | 'monthly') => {
    setFeedPeriod(period);
    AsyncStorage.setItem('feedPeriod', period);
  };

  const { totalBalance, periodIncome, periodExpenses, recentTransactions } = useMemo(() => {
    const balance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
    const now = new Date();

    let periodTransactions;
    if (feedPeriod === 'daily') {
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      periodTransactions = transactions.filter((t) => new Date(t.date) >= todayStart);
    } else {
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      periodTransactions = transactions.filter((t) => {
        const tDate = new Date(t.date);
        return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
      });
    }

    const income = periodTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = periodTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const recent = transactions.slice(0, 5);

    return {
      totalBalance: balance,
      periodIncome: income,
      periodExpenses: expenses,
      recentTransactions: recent,
    };
  }, [wallets, transactions, feedPeriod]);

  const currentBudget = useMemo(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    return budgets.find((b) => b.month === currentMonth);
  }, [budgets]);

  const activeGoals = useMemo(() => {
    return savingsGoals.filter((g) => g.status === 'active').slice(0, 3);
  }, [savingsGoals]);

  const profileImageUrl = user?.avatar;
  const periodLabel = feedPeriod === 'daily' ? 'today' : 'this month';
  const netSpending = periodExpenses - periodIncome;

  const cardBorder = { borderWidth: 1, borderColor: colors.border };

  const getIconName = (type: string, category: string): string => {
    if (type === 'transfer') return 'swap-horizontal-outline';
    if (type === 'income') return 'arrow-down-circle-outline';
    const categoryIcons: Record<string, string> = {
      'Food & Dining': 'restaurant-outline',
      Transport: 'car-outline',
      Shopping: 'cart-outline',
      Entertainment: 'film-outline',
      Bills: 'receipt-outline',
      Health: 'medkit-outline',
      Salary: 'briefcase-outline',
      Freelance: 'laptop-outline',
      Business: 'storefront-outline',
    };
    return categoryIcons[category] || 'ellipse-outline';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `Today, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    }
    if (diffDays === 1) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.backgroundSubtle }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}>

      {/* Header — profile left, utility icons right */}
      <View style={styles.header}>
        <Pressable style={styles.profileButton} onPress={() => router.push('/(tabs)/profile')}>
          {profileImageUrl ? (
            <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
          ) : (
            <View style={[styles.profilePlaceholder, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="person" size={22} color={colors.primary} />
            </View>
          )}
        </Pressable>

        <View style={styles.headerActions}>
          <Pressable style={[styles.headerIconButton, cardBorder, { backgroundColor: colors.backgroundElevated }]}>
            <Ionicons name="notifications-outline" size={IconSize.md} color={colors.text} />
          </Pressable>
          <Pressable
            style={[styles.headerIconButton, cardBorder, { backgroundColor: colors.backgroundElevated }]}
            onPress={() => router.push('/(tabs)/budgets')}>
            <Ionicons name="wallet-outline" size={IconSize.md} color={colors.text} />
          </Pressable>
        </View>
      </View>

      {/* Search bar */}
      <View style={[styles.searchBar, cardBorder, { backgroundColor: colors.backgroundElevated }]}>
        <Ionicons name="search-outline" size={IconSize.md} color={colors.textTertiary} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search transactions..."
          placeholderTextColor={colors.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => router.push('/(tabs)/transactions')}
          returnKeyType="search"
        />
      </View>

      {/* Split balance card */}
      <View style={[styles.balanceCardWrapper, cardBorder, Elevation.card]}>
        <LinearGradient
          colors={[colors.primary, colors.primaryHover]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.balanceCardTop}>
          <View style={styles.periodToggle}>
            <Pressable
              style={[styles.periodButton, feedPeriod === 'daily' && styles.periodButtonActive]}
              onPress={() => toggleFeedPeriod('daily')}>
              <Text style={[styles.periodButtonText, feedPeriod === 'daily' && styles.periodButtonTextActive]}>
                Daily
              </Text>
            </Pressable>
            <Pressable
              style={[styles.periodButton, feedPeriod === 'monthly' && styles.periodButtonActive]}
              onPress={() => toggleFeedPeriod('monthly')}>
              <Text style={[styles.periodButtonText, feedPeriod === 'monthly' && styles.periodButtonTextActive]}>
                Monthly
              </Text>
            </Pressable>
          </View>

          <View style={styles.balanceTopRow}>
            <View style={styles.balanceTopLeft}>
              <View style={styles.balanceIconRow}>
                <View style={styles.balanceIconWrap}>
                  <Ionicons name="wallet" size={IconSize.sm} color="#FFFFFF" />
                </View>
                <Text style={styles.balanceLabel}>Total Balance</Text>
              </View>
              <Text style={styles.balanceAmount}>
                {balanceVisible ? formatCurrencyFull(totalBalance, userCurrency) : '••••••'}
              </Text>
            </View>
            <Pressable style={styles.eyeButton} onPress={() => setBalanceVisible((v) => !v)}>
              <Ionicons
                name={balanceVisible ? 'eye-off-outline' : 'eye-outline'}
                size={IconSize.sm}
                color="rgba(255,255,255,0.9)"
              />
            </Pressable>
          </View>

          <Pressable style={styles.transferButton} onPress={() => router.push('/transfer')}>
            <Text style={styles.transferButtonText}>Transfer</Text>
            <Ionicons name="arrow-forward" size={IconSize.sm} color={colors.primary} />
          </Pressable>
        </LinearGradient>

        <View style={[styles.balanceCardBottom, { backgroundColor: colors.backgroundElevated }]}>
          <View style={styles.insightsRow}>
            <View style={styles.insightBlock}>
              <Text style={[styles.insightLabel, { color: colors.textSecondary }]}>
                Spent {periodLabel}
              </Text>
              <Text style={[styles.insightValue, { color: colors.text }]}>
                {formatCurrency(periodExpenses, userCurrency)}
              </Text>
            </View>
            <View style={[styles.insightDivider, { backgroundColor: colors.borderLight }]} />
            <View style={styles.insightBlock}>
              <Text style={[styles.insightLabel, { color: colors.textSecondary }]}>
                Net {periodLabel}
              </Text>
              <Text style={[styles.insightValue, { color: netSpending > 0 ? colors.expense : colors.income }]}>
                {netSpending > 0 ? '-' : '+'}
                {formatCurrency(Math.abs(netSpending), userCurrency)}
              </Text>
            </View>
          </View>
          <Pressable style={styles.seeInsightsLink} onPress={() => router.push('/(tabs)/transactions')}>
            <Text style={[styles.seeInsightsText, { color: colors.income }]}>See Insights</Text>
            <Ionicons name="arrow-forward" size={14} color={colors.income} />
          </Pressable>
        </View>
      </View>

      {/* Progressive Setup */}
      <View style={styles.section}>
        <ProgressiveSetup />
      </View>

      {/* Quick Actions — 2×2 grid */}
      <View style={styles.section}>
        <View style={styles.actionGrid}>
          <Pressable
            style={[styles.actionCard, cardBorder, { backgroundColor: colors.backgroundElevated }]}
            onPress={() => router.push('/add-expense')}>
            <View style={[styles.actionIcon, { backgroundColor: colors.expenseSoft }]}>
              <Ionicons name="arrow-up" size={IconSize.md} color={colors.expense} />
            </View>
            <Text style={[styles.actionText, { color: colors.text }]}>Send</Text>
          </Pressable>

          <Pressable
            style={[styles.actionCard, cardBorder, { backgroundColor: colors.backgroundElevated }]}
            onPress={() => router.push('/add-income')}>
            <View style={[styles.actionIcon, { backgroundColor: colors.incomeSoft }]}>
              <Ionicons name="arrow-down" size={IconSize.md} color={colors.income} />
            </View>
            <Text style={[styles.actionText, { color: colors.text }]}>Receive</Text>
          </Pressable>

          <Pressable
            style={[styles.actionCard, cardBorder, { backgroundColor: colors.backgroundElevated }]}
            onPress={() => router.push('/(tabs)/budgets')}>
            <View style={[styles.actionIcon, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="pie-chart-outline" size={IconSize.md} color={colors.primary} />
            </View>
            <Text style={[styles.actionText, { color: colors.text }]}>Budget</Text>
          </Pressable>

          <Pressable
            style={[styles.actionCard, cardBorder, { backgroundColor: colors.backgroundElevated }]}
            onPress={() => router.push('/(tabs)/savings')}>
            <View style={[styles.actionIcon, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="flag-outline" size={IconSize.md} color={colors.primary} />
            </View>
            <Text style={[styles.actionText, { color: colors.text }]}>Goals</Text>
          </Pressable>
        </View>
      </View>

      {/* Recent Transactions — list bar */}
      <View style={styles.section}>
        <Pressable
          style={[styles.listBar, cardBorder, { backgroundColor: colors.backgroundElevated }]}
          onPress={() => router.push('/(tabs)/transactions')}>
          <View style={[styles.listBarIcon, { backgroundColor: colors.primarySoft }]}>
            <Ionicons name="receipt-outline" size={IconSize.md} color={colors.primary} />
          </View>
          <View style={styles.listBarContent}>
            <Text style={[styles.listBarTitle, { color: colors.text }]}>Recent Transactions</Text>
            <Text style={[styles.listBarSubtitle, { color: colors.textSecondary }]}>
              {recentTransactions.length === 0
                ? 'No activity yet'
                : `${recentTransactions.length} recent ${recentTransactions.length === 1 ? 'entry' : 'entries'}`}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={IconSize.md} color={colors.textTertiary} />
        </Pressable>
      </View>

      {/* Transaction preview list */}
      {recentTransactions.length > 0 && (
        <View style={styles.section}>
          <View style={[styles.transactionsCard, cardBorder, { backgroundColor: colors.backgroundElevated }]}>
            {recentTransactions.map((transaction, index) => (
              <Pressable
                key={transaction.id}
                style={[
                  styles.transactionItem,
                  index < recentTransactions.length - 1 && [
                    styles.transactionBorder,
                    { borderBottomColor: colors.borderLight },
                  ],
                ]}
                onPress={() => router.push('/(tabs)/transactions')}>
                <View style={styles.transactionLeft}>
                  <View
                    style={[
                      styles.transactionIcon,
                      {
                        backgroundColor:
                          transaction.type === 'income' ? colors.incomeSoft : colors.primarySoft,
                      },
                    ]}>
                    <Ionicons
                      name={getIconName(transaction.type, transaction.category) as any}
                      size={IconSize.sm}
                      color={transaction.type === 'income' ? colors.income : colors.primary}
                    />
                  </View>
                  <View>
                    <Text style={[styles.transactionName, { color: colors.text }]}>
                      {transaction.category}
                    </Text>
                    <Text style={[styles.transactionDate, { color: colors.textSecondary }]}>
                      {formatDate(transaction.date)}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    { color: transaction.type === 'income' ? colors.income : colors.text },
                  ]}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrencyFull(transaction.amount, userCurrency)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {/* Budget — list bar + detail card */}
      {currentBudget && (
        <View style={styles.section}>
          <Pressable
            style={[styles.listBar, cardBorder, { backgroundColor: colors.backgroundElevated }]}
            onPress={() => router.push('/(tabs)/budgets')}>
            <View style={[styles.listBarIcon, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="wallet-outline" size={IconSize.md} color={colors.primary} />
            </View>
            <View style={styles.listBarContent}>
              <Text style={[styles.listBarTitle, { color: colors.text }]}>Budget Overview</Text>
              <Text style={[styles.listBarSubtitle, { color: colors.textSecondary }]}>
                Track spending against your plan
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={IconSize.md} color={colors.textTertiary} />
          </Pressable>

          <View style={[styles.budgetCard, cardBorder, { backgroundColor: colors.backgroundElevated }]}>
            <View style={styles.budgetSummary}>
              <View style={styles.budgetSummaryLeft}>
                <Text style={[styles.budgetSummaryLabel, { color: colors.textSecondary }]}>This Month</Text>
                <Text style={[styles.budgetSummaryAmount, { color: colors.text }]}>
                  {formatCurrencyFull(
                    currentBudget.categories.reduce((sum, cat) => sum + cat.spent, 0),
                    userCurrency,
                  )}
                </Text>
                <Text style={[styles.budgetSummarySubtext, { color: colors.textSecondary }]}>
                  of {formatCurrency(currentBudget.monthlyIncome, userCurrency)} budget
                </Text>
              </View>
              <View style={styles.budgetSummaryRight}>
                {(() => {
                  const totalSpent = currentBudget.categories.reduce((sum, cat) => sum + cat.spent, 0);
                  const totalAllocated = currentBudget.categories.reduce(
                    (sum, cat) => sum + cat.allocated,
                    0,
                  );
                  const percentage = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0;
                  const isDanger = percentage > 100;

                  return (
                    <View style={[styles.percentageCircle, { backgroundColor: colors.primarySoft }]}>
                      <Text
                        style={[
                          styles.percentageText,
                          { color: isDanger ? colors.error : colors.primary },
                        ]}>
                        {percentage.toFixed(0)}%
                      </Text>
                    </View>
                  );
                })()}
              </View>
            </View>

            <View style={[styles.dividerLine, { backgroundColor: colors.borderLight }]} />

            <View style={styles.budgetCategories}>
              {currentBudget.categories.slice(0, 3).map((category) => {
                const progress =
                  category.allocated > 0 ? (category.spent / category.allocated) * 100 : 0;
                const isOverBudget = progress > 100;

                return (
                  <View key={category.name} style={styles.budgetCategoryItem}>
                    <View style={styles.budgetCategoryRow}>
                      <View style={styles.budgetCategoryInfo}>
                        <View style={styles.budgetCategoryLabelRow}>
                          <View style={[styles.categoryDot, { backgroundColor: colors.primary }]} />
                          <Text style={[styles.budgetCategoryLabel, { color: colors.text }]}>
                            {category.name}
                          </Text>
                        </View>
                        <View style={[styles.progressBarThin, { backgroundColor: colors.borderLight }]}>
                          <View
                            style={[
                              styles.progressFillThin,
                              {
                                width: `${Math.min(progress, 100)}%`,
                                backgroundColor: isOverBudget ? colors.error : colors.primary,
                              },
                            ]}
                          />
                        </View>
                      </View>
                      <View style={styles.budgetCategoryAmounts}>
                        <Text style={[styles.budgetCategorySpent, { color: colors.text }]}>
                          {formatCurrency(category.spent, userCurrency)}
                        </Text>
                        <Text style={[styles.budgetCategoryTotal, { color: colors.textSecondary }]}>
                          / {formatCurrency(category.allocated, userCurrency)}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      )}

      {/* Savings Goals */}
      {activeGoals.length > 0 && (
        <View style={[styles.section, { marginBottom: 100 }]}>
          <Pressable
            style={[styles.listBar, cardBorder, { backgroundColor: colors.backgroundElevated }]}
            onPress={() => router.push('/(tabs)/savings')}>
            <View style={[styles.listBarIcon, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="flag-outline" size={IconSize.md} color={colors.primary} />
            </View>
            <View style={styles.listBarContent}>
              <Text style={[styles.listBarTitle, { color: colors.text }]}>Savings Goals</Text>
              <Text style={[styles.listBarSubtitle, { color: colors.textSecondary }]}>
                {activeGoals.length} active {activeGoals.length === 1 ? 'goal' : 'goals'}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={IconSize.md} color={colors.textTertiary} />
          </Pressable>

          <View style={styles.goalsStack}>
            {activeGoals.map((goal) => {
              const progress =
                goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
              const remaining = goal.targetAmount - goal.currentAmount;

              return (
                <Pressable
                  key={goal.id}
                  style={[styles.goalCard, cardBorder, { backgroundColor: colors.backgroundElevated }]}
                  onPress={() => router.push('/(tabs)/savings')}>
                  <View style={styles.goalCardTop}>
                    <View style={styles.goalCardLeft}>
                      <View style={[styles.goalIconSmall, { backgroundColor: colors.primarySoft }]}>
                        <Ionicons name={(goal.icon as any) || 'flag'} size={20} color={colors.primary} />
                      </View>
                      <View style={styles.goalInfo}>
                        <Text style={[styles.goalNameText, { color: colors.text }]} numberOfLines={1}>
                          {goal.name}
                        </Text>
                        <Text style={[styles.goalTargetText, { color: colors.textSecondary }]}>
                          Target: {formatCurrencyFull(goal.targetAmount, userCurrency)}
                        </Text>
                      </View>
                    </View>
                    <Text style={[styles.goalPercentage, { color: colors.primary }]}>
                      {progress.toFixed(0)}%
                    </Text>
                  </View>

                  <View style={[styles.goalProgressBar, { backgroundColor: colors.borderLight }]}>
                    <View
                      style={[
                        styles.goalProgressFill,
                        { width: `${Math.min(progress, 100)}%`, backgroundColor: colors.primary },
                      ]}
                    />
                  </View>

                  <View style={styles.goalCardBottom}>
                    <Text style={[styles.goalCurrentAmount, { color: colors.text }]}>
                      {formatCurrency(goal.currentAmount, userCurrency)} saved
                    </Text>
                    <Text style={[styles.goalRemaining, { color: colors.textSecondary }]}>
                      {formatCurrency(remaining, userCurrency)} to go
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}

      {!currentBudget && activeGoals.length === 0 && <View style={{ height: 100 }} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.screenPadding,
    paddingTop: 60,
    paddingBottom: Spacing.md,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  headerIconButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...Elevation.soft,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: Radius.full,
  },
  profilePlaceholder: {
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Layout.screenPadding,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
    borderRadius: Radius.xl,
    gap: Spacing.sm,
    ...Elevation.soft,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },

  balanceCardWrapper: {
    marginHorizontal: Layout.screenPadding,
    marginBottom: Spacing.xl,
    borderRadius: Radius.xl,
    overflow: 'hidden',
  },
  balanceCardTop: {
    padding: Spacing.xl,
  },
  periodToggle: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: Radius.md,
    padding: 4,
    marginBottom: Spacing.lg,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: Radius.sm,
  },
  periodButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  periodButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
  },
  balanceTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  balanceTopLeft: {
    flex: 1,
  },
  balanceIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  balanceIconWrap: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '500',
  },
  balanceAmount: {
    ...Typography.display,
    color: '#FFFFFF',
  },
  eyeButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transferButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Spacing.sm,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
    borderRadius: Radius.full,
  },
  transferButtonText: {
    fontSize: 15,
    fontWeight: FontWeight.semibold,
    color: Colors.light.primary,
  },

  balanceCardBottom: {
    padding: Spacing.lg,
  },
  insightsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  insightBlock: {
    flex: 1,
  },
  insightDivider: {
    width: 1,
    height: 36,
    marginHorizontal: Spacing.md,
  },
  insightLabel: {
    ...Typography.small,
    marginBottom: 4,
  },
  insightValue: {
    fontSize: 18,
    fontWeight: FontWeight.bold,
  },
  seeInsightsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeInsightsText: {
    fontSize: 14,
    fontWeight: FontWeight.semibold,
  },

  section: {
    paddingHorizontal: Layout.screenPadding,
    marginBottom: Spacing.lg,
  },

  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  actionCard: {
    width: '47%',
    aspectRatio: 1.05,
    borderRadius: Radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
    ...Elevation.soft,
  },
  actionIcon: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    ...Typography.caption,
    fontWeight: FontWeight.semibold,
  },

  listBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    gap: Spacing.md,
    marginBottom: Spacing.md,
    ...Elevation.soft,
  },
  listBarIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listBarContent: {
    flex: 1,
  },
  listBarTitle: {
    ...Typography.body,
    fontWeight: FontWeight.semibold,
    marginBottom: 2,
  },
  listBarSubtitle: {
    ...Typography.small,
    fontWeight: FontWeight.regular,
  },

  transactionsCard: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Elevation.soft,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  transactionBorder: {
    borderBottomWidth: 1,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionName: {
    ...Typography.body,
    fontWeight: FontWeight.semibold,
    marginBottom: 2,
  },
  transactionDate: {
    ...Typography.small,
  },
  transactionAmount: {
    ...Typography.body,
    fontWeight: FontWeight.semibold,
  },

  budgetCard: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    ...Elevation.soft,
  },
  budgetSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  budgetSummaryLeft: {
    flex: 1,
  },
  budgetSummaryLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
  },
  budgetSummaryAmount: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  budgetSummarySubtext: {
    fontSize: 13,
  },
  budgetSummaryRight: {
    marginLeft: Spacing.md,
  },
  percentageCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 18,
    fontWeight: '700',
  },
  dividerLine: {
    height: 1,
    marginBottom: Spacing.lg,
  },
  budgetCategories: {
    gap: Spacing.md,
  },
  budgetCategoryItem: {},
  budgetCategoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  budgetCategoryInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  budgetCategoryLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  budgetCategoryLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBarThin: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFillThin: {
    height: '100%',
    borderRadius: 2,
  },
  budgetCategoryAmounts: {
    alignItems: 'flex-end',
  },
  budgetCategorySpent: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  budgetCategoryTotal: {
    fontSize: 12,
    fontWeight: '500',
  },

  goalsStack: {
    gap: Spacing.md,
  },
  goalCard: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    ...Elevation.soft,
  },
  goalCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  goalCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.md,
  },
  goalIconSmall: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  goalInfo: {
    flex: 1,
  },
  goalNameText: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  goalTargetText: {
    fontSize: 12,
  },
  goalPercentage: {
    fontSize: 20,
    fontWeight: '700',
  },
  goalProgressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  goalProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  goalCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalCurrentAmount: {
    fontSize: 13,
    fontWeight: '600',
  },
  goalRemaining: {
    fontSize: 12,
  },
});
