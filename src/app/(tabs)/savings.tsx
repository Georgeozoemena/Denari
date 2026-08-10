import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Colors, Elevation, FontWeight, IconSize, Layout, Radius, Spacing, Typography } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { formatCurrency, formatCurrencyFull } from '@/utils/currency';

export default function SavingsGoalsScreen() {
  const router = useRouter();
  const colors = Colors.light;
  const { savingsGoals, user } = useApp();
  const cardBorder = { borderWidth: 1, borderColor: colors.border };
  const userCurrency = user?.currency || 'NGN';

  const { totalGoals, activeGoals, completedGoals, totalTarget, totalSaved } = useMemo(() => {
    const active = savingsGoals.filter((g) => g.status === 'active').length;
    const completed = savingsGoals.filter((g) => g.status === 'completed').length;
    const target = savingsGoals.reduce((sum, g) => sum + g.targetAmount, 0);
    const saved = savingsGoals.reduce((sum, g) => sum + g.currentAmount, 0);
    return {
      totalGoals: savingsGoals.length,
      activeGoals: active,
      completedGoals: completed,
      totalTarget: target,
      totalSaved: saved,
    };
  }, [savingsGoals]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return colors.income;
      case 'paused':
        return colors.warning;
      default:
        return colors.primary;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'paused':
        return 'Paused';
      default:
        return 'Active';
    }
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 30) return `${diffDays} days left`;
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} left`;
    }
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? 's' : ''} left`;
  };

  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundSubtle }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Savings Goals</Text>
          <Pressable
            onPress={() => router.push('/create-goal')}
            style={[styles.headerIconButton, { backgroundColor: colors.primary }]}>
            <Ionicons name="add" size={IconSize.lg} color="#FFFFFF" />
          </Pressable>
        </View>

        {totalGoals === 0 ? (
          <View style={[styles.emptyCard, cardBorder, { backgroundColor: colors.backgroundElevated }]}>
            <EmptyState
              icon="flag-outline"
              title="No Savings Goals"
              message="Set savings goals to track your progress and achieve your financial dreams."
            />
            <Button title="Create Goal" onPress={() => router.push('/create-goal')} style={styles.createButton} />
          </View>
        ) : (
          <>
            {/* Split summary card */}
            <View style={[styles.summaryWrapper, cardBorder, Elevation.card]}>
              <LinearGradient
                colors={[colors.primary, colors.primaryHover]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.summaryTop}>
                <Text style={styles.summaryTopLabel}>Total Saved</Text>
                <Text style={styles.summaryTopAmount}>{formatCurrencyFull(totalSaved, userCurrency)}</Text>
                <Text style={styles.summaryTopSubtext}>
                  of {formatCurrency(totalTarget, userCurrency)} target
                </Text>
              </LinearGradient>

              <View style={[styles.summaryBottom, { backgroundColor: colors.backgroundElevated }]}>
                <View style={styles.summaryRow}>
                  <View style={styles.summaryItem}>
                    <Text style={[styles.summaryValue, { color: colors.text }]}>{activeGoals}</Text>
                    <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Active</Text>
                  </View>
                  <View style={[styles.summaryDivider, { backgroundColor: colors.borderLight }]} />
                  <View style={styles.summaryItem}>
                    <Text style={[styles.summaryValue, { color: colors.text }]}>{completedGoals}</Text>
                    <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Completed</Text>
                  </View>
                  <View style={[styles.summaryDivider, { backgroundColor: colors.borderLight }]} />
                  <View style={styles.summaryItem}>
                    <Text style={[styles.summaryValue, { color: colors.text }]}>{totalGoals}</Text>
                    <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Total</Text>
                  </View>
                </View>

                <View style={styles.overallProgress}>
                  <View style={styles.progressHeader}>
                    <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>Overall Progress</Text>
                    <Text style={[styles.progressPercent, { color: colors.text }]}>
                      {overallProgress.toFixed(0)}%
                    </Text>
                  </View>
                  <View style={[styles.progressBar, { backgroundColor: colors.borderLight }]}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${Math.min(overallProgress, 100)}%`, backgroundColor: colors.primary },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </View>

            <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Goals ({totalGoals})</Text>

            {savingsGoals.map((goal) => {
              const percentage = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
              const isOverdue = new Date(goal.deadline) < new Date() && goal.status !== 'completed';
              const statusColor = getStatusColor(goal.status);

              return (
                <Pressable
                  key={goal.id}
                  style={[styles.goalCard, cardBorder, { backgroundColor: colors.backgroundElevated }]}
                  onPress={() => router.push(`/goal/${goal.id}` as any)}>
                  <View style={styles.goalHeader}>
                    <View style={styles.goalLeft}>
                      <View style={[styles.goalIcon, { backgroundColor: colors.primarySoft }]}>
                        <Ionicons
                          name={(goal.icon as any) || 'flag'}
                          size={IconSize.lg}
                          color={colors.primary}
                        />
                      </View>
                      <View style={styles.goalInfo}>
                        <Text style={[styles.goalName, { color: colors.text }]}>{goal.name}</Text>
                        <Text
                          style={[
                            styles.goalDeadline,
                            { color: isOverdue ? colors.error : colors.textSecondary },
                          ]}>
                          {formatDeadline(goal.deadline)}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: `${statusColor}22` }]}>
                      <Text style={[styles.statusText, { color: statusColor }]}>
                        {getStatusLabel(goal.status)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.goalProgress}>
                    <View style={[styles.progressBar, { backgroundColor: colors.borderLight, flex: 1 }]}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${Math.min(percentage, 100)}%`, backgroundColor: colors.primary },
                        ]}
                      />
                    </View>
                    <Text style={[styles.goalProgressText, { color: colors.textSecondary }]}>
                      {percentage.toFixed(0)}%
                    </Text>
                  </View>

                  <View style={styles.goalAmounts}>
                    <View style={styles.amountItem}>
                      <Text style={[styles.amountLabel, { color: colors.textSecondary }]}>Saved</Text>
                      <Text style={[styles.amountValue, { color: colors.text }]}>
                        {formatCurrency(goal.currentAmount, userCurrency)}
                      </Text>
                    </View>
                    <View style={styles.amountItem}>
                      <Text style={[styles.amountLabel, { color: colors.textSecondary }]}>Target</Text>
                      <Text style={[styles.amountValue, { color: colors.text }]}>
                        {formatCurrency(goal.targetAmount, userCurrency)}
                      </Text>
                    </View>
                    <View style={styles.amountItem}>
                      <Text style={[styles.amountLabel, { color: colors.textSecondary }]}>Remaining</Text>
                      <Text style={[styles.amountValue, { color: colors.text }]}>
                        {formatCurrency(goal.targetAmount - goal.currentAmount, userCurrency)}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
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
  emptyCard: {
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    ...Elevation.soft,
  },
  createButton: { marginTop: Spacing.xl },
  summaryWrapper: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
  },
  summaryTop: { padding: Spacing.xl },
  summaryTopLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: Spacing.sm,
  },
  summaryTopAmount: {
    ...Typography.display,
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  summaryTopSubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
  },
  summaryBottom: { padding: Spacing.lg },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryDivider: { width: 1, height: 36 },
  summaryValue: { fontSize: 20, fontWeight: FontWeight.bold, marginBottom: 4 },
  summaryLabel: { ...Typography.small },
  overallProgress: { gap: Spacing.sm },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: { ...Typography.small },
  progressPercent: { fontSize: 15, fontWeight: FontWeight.semibold },
  progressBar: { height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  sectionTitle: {
    ...Typography.title,
    fontSize: 18,
    marginBottom: Spacing.md,
  },
  goalCard: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Elevation.soft,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  goalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
    marginRight: Spacing.sm,
  },
  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalInfo: { flex: 1 },
  goalName: {
    ...Typography.body,
    fontWeight: FontWeight.semibold,
    marginBottom: 2,
  },
  goalDeadline: { ...Typography.small },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  statusText: { ...Typography.small, fontWeight: FontWeight.semibold },
  goalProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  goalProgressText: { ...Typography.small, fontWeight: FontWeight.semibold, minWidth: 40, textAlign: 'right' },
  goalAmounts: { flexDirection: 'row', justifyContent: 'space-between' },
  amountItem: { flex: 1, alignItems: 'center' },
  amountLabel: { ...Typography.small, marginBottom: 4 },
  amountValue: { fontSize: 15, fontWeight: FontWeight.semibold },
});
