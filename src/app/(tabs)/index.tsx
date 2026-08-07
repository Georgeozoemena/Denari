import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors, Elevation, FontWeight, IconSize, Layout, Radius, Spacing, Typography } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

export default function HomeScreen() {
  const router = useRouter();
  const colors = Colors.light;
  const { transactions, user } = useApp();

  // Calculate totals from real data
  const { totalBalance, monthlyIncome, monthlyExpenses, recentTransactions } = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const thisMonthTransactions = transactions.filter((t) => {
      const tDate = new Date(t.date);
      return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
    });

    const income = thisMonthTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = thisMonthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;
    const recent = transactions.slice(0, 5);

    return {
      totalBalance: balance,
      monthlyIncome: income,
      monthlyExpenses: expenses,
      recentTransactions: recent,
    };
  }, [transactions]);

  const profileImageUrl = user?.avatar;
  const userName = user?.name || 'Guest';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `₦${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `₦${(amount / 1000).toFixed(0)}K`;
    return `₦${amount.toLocaleString()}`;
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}>
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.textTertiary }]}>{getGreeting()}</Text>
          <Text style={[styles.userName, { color: colors.text }]}>{userName}</Text>
        </View>
        <Pressable
          style={styles.profileButton}
          onPress={() => router.push('/(tabs)/profile')}>
          {profileImageUrl ? (
            <Image
              source={{ uri: profileImageUrl }}
              style={styles.profileImage}
            />
          ) : (
            <View style={[styles.profilePlaceholder, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="person" size={24} color={colors.primary} />
            </View>
          )}
        </Pressable>
      </View>

      {/* Balance Card - Premium gradient */}
      <LinearGradient
        colors={[colors.primary, colors.primaryHover]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <View>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceAmount}>₦{totalBalance.toLocaleString()}</Text>
          </View>
          <Pressable style={styles.eyeButton}>
            <Ionicons name="eye-off-outline" size={IconSize.sm} color="rgba(255,255,255,0.9)" />
          </Pressable>
        </View>
        
        <View style={styles.balanceFooter}>
          <View style={styles.balanceStat}>
            <Text style={styles.balanceStatLabel}>Income</Text>
            <Text style={styles.balanceStatValue}>+{formatCurrency(monthlyIncome)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.balanceStat}>
            <Text style={styles.balanceStatLabel}>Expenses</Text>
            <Text style={styles.balanceStatValue}>-{formatCurrency(monthlyExpenses)}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Quick Actions - Clean grid */}
      <View style={styles.section}>
        <View style={styles.actionGrid}>
          <Pressable 
            style={[styles.actionCard, { backgroundColor: colors.backgroundElevated }]}
            onPress={() => router.push('/add-expense')}>
            <View style={[styles.actionIcon, { backgroundColor: colors.expenseSoft }]}>
              <Ionicons name="arrow-up" size={IconSize.sm} color={colors.expense} />
            </View>
            <Text style={[styles.actionText, { color: colors.text }]}>Send</Text>
          </Pressable>

          <Pressable 
            style={[styles.actionCard, { backgroundColor: colors.backgroundElevated }]}
            onPress={() => router.push('/add-income')}>
            <View style={[styles.actionIcon, { backgroundColor: colors.incomeSoft }]}>
              <Ionicons name="arrow-down" size={IconSize.sm} color={colors.income} />
            </View>
            <Text style={[styles.actionText, { color: colors.text }]}>Receive</Text>
          </Pressable>

          <Pressable 
            style={[styles.actionCard, { backgroundColor: colors.backgroundElevated }]}>
            <View style={[styles.actionIcon, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="wallet-outline" size={IconSize.sm} color={colors.primary} />
            </View>
            <Text style={[styles.actionText, { color: colors.text }]}>Budget</Text>
          </Pressable>

          <Pressable 
            style={[styles.actionCard, { backgroundColor: colors.backgroundElevated }]}>
            <View style={[styles.actionIcon, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="analytics-outline" size={IconSize.sm} color={colors.primary} />
            </View>
            <Text style={[styles.actionText, { color: colors.text }]}>Analytics</Text>
          </Pressable>
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
          <Pressable onPress={() => router.push('/(tabs)/transactions')}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
          </Pressable>
        </View>

        {recentTransactions.length === 0 ? (
          <View style={[styles.emptyCard, { backgroundColor: colors.backgroundElevated }]}>
            <Ionicons name="receipt-outline" size={48} color={colors.textTertiary} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No transactions yet
            </Text>
          </View>
        ) : (
          <View style={[styles.transactionsCard, { backgroundColor: colors.backgroundElevated }]}>
            {recentTransactions.map((transaction, index) => {
              const getIconName = (type: string, category: string): string => {
                if (type === 'transfer') return 'swap-horizontal-outline';
                if (type === 'income') return 'arrow-down-circle-outline';
                const categoryIcons: Record<string, string> = {
                  'Food & Dining': 'restaurant-outline',
                  'Transport': 'car-outline',
                  'Shopping': 'cart-outline',
                  'Entertainment': 'film-outline',
                  'Bills': 'receipt-outline',
                  'Health': 'medkit-outline',
                  'Salary': 'briefcase-outline',
                  'Freelance': 'laptop-outline',
                  'Business': 'storefront-outline',
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
                } else if (diffDays === 1) {
                  return 'Yesterday';
                } else {
                  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                }
              };

              return (
                <Pressable
                  key={transaction.id}
                  style={[
                    styles.transactionItem,
                    index < recentTransactions.length - 1 && [styles.transactionBorder, { borderBottomColor: colors.borderLight }],
                  ]}>
                  <View style={styles.transactionLeft}>
                    <View style={[
                      styles.transactionIcon, 
                      { backgroundColor: transaction.type === 'income' ? colors.incomeSoft : colors.primarySoft }
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
                    {transaction.type === 'income' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </View>

      {/* Budget Overview */}
      <View style={[styles.section, { marginBottom: 100 }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Budget Status</Text>
        <View style={[styles.budgetCard, { backgroundColor: colors.backgroundSubtle }]}>
          <View style={styles.budgetHeader}>
            <View>
              <Text style={[styles.budgetLabel, { color: colors.textSecondary }]}>
                Monthly Budget
              </Text>
              <Text style={[styles.budgetAmount, { color: colors.text }]}>₦350,000</Text>
            </View>
            <View style={[styles.budgetBadge, { backgroundColor: colors.incomeSoft }]}>
              <Ionicons name="trending-down" size={12} color={colors.income} />
              <Text style={[styles.budgetBadgeText, { color: colors.income }]}>40% left</Text>
            </View>
          </View>
          
          <View style={[styles.progressBar, { backgroundColor: colors.borderLight }]}>
            <View 
              style={[
                styles.progressFill, 
                { width: '60%', backgroundColor: colors.primary }
              ]} 
            />
          </View>
          
          <Text style={[styles.budgetStatus, { color: colors.textSecondary }]}>
            ₦210,000 spent this month
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.screenPadding,
    paddingTop: 60,
    paddingBottom: Spacing.lg,
  },
  greeting: {
    ...Typography.small,
    marginBottom: 4,
  },
  userName: {
    ...Typography.heading,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    ...Elevation.soft,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
  },
  profilePlaceholder: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: Radius.full,
  },

  // Balance Card
  balanceCard: {
    marginHorizontal: Layout.screenPadding,
    marginBottom: Spacing.xl,
    padding: Spacing.xl,
    borderRadius: Radius.xl,
    ...Elevation.card,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    marginBottom: 8,
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
  balanceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
  },
  balanceStat: {
    flex: 1,
  },
  balanceStatLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  balanceStatValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginHorizontal: Spacing.md,
  },

  // Sections
  section: {
    paddingHorizontal: Layout.screenPadding,
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.title,
  },
  seeAll: {
    ...Typography.caption,
    fontWeight: FontWeight.semibold,
  },

  // Quick Actions
  actionGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionCard: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: Radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
    ...Elevation.soft,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    ...Typography.small,
    fontWeight: FontWeight.semibold,
  },

  // Transactions
  transactionsCard: {
    borderRadius: Radius.lg,
    ...Elevation.soft,
  },
  emptyCard: {
    borderRadius: Radius.lg,
    padding: Spacing.xxl,
    alignItems: 'center',
    gap: Spacing.md,
    ...Elevation.soft,
  },
  emptyText: {
    ...Typography.body,
    fontWeight: FontWeight.medium,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
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

  // Budget
  budgetCard: {
    marginTop: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    ...Elevation.soft,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  budgetLabel: {
    ...Typography.small,
    marginBottom: 4,
  },
  budgetAmount: {
    ...Typography.heading,
  },
  budgetBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Radius.full,
  },
  budgetBadgeText: {
    ...Typography.small,
    fontWeight: FontWeight.bold,
  },
  progressBar: {
    height: 8,
    borderRadius: Radius.sm,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: Radius.sm,
  },
  budgetStatus: {
    ...Typography.small,
  },
});
