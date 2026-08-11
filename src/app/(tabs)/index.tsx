import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, FontWeight, IconSize, Layout, Radius, Spacing, Typography } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { formatCurrency, formatCurrencyFull } from '@/utils/currency';

export default function HomeScreen() {
  const router = useRouter();
  const colors = Colors.light;
  const { user, wallets, transactions, savingsGoals } = useApp();

  const userCurrency = user?.currency || 'NGN';
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('balanceVisible').then((saved: string | null) => {
      if (saved === 'false') setBalanceVisible(false);
    });
  }, []);

  const toggleBalanceVisible = () => {
    setBalanceVisible((v) => {
      AsyncStorage.setItem('balanceVisible', String(!v));
      return !v;
    });
  };

  const { totalBalance, recentTransactions } = useMemo(() => {
    const balance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
    const recent = transactions.slice(0, 6);
    return { totalBalance: balance, recentTransactions: recent };
  }, [wallets, transactions]);

  const activeGoals = useMemo(() => {
    return savingsGoals.filter((g) => g.status === 'active').slice(0, 5);
  }, [savingsGoals]);

  const profileImageUrl = user?.avatar;

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
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Navy header section — balance card + quick actions live on this surface */}
      <SafeAreaView edges={['top']} style={[styles.navySection, { backgroundColor: colors.navy }]}>
        <View style={styles.navyContent}>
          {/* Header — avatar left, notification right */}
          <View style={styles.header}>
            <Pressable style={styles.profileButton} onPress={() => router.push('/(tabs)/profile')}>
              {profileImageUrl ? (
                <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
              ) : (
                <View style={[styles.profilePlaceholder, { backgroundColor: colors.navySoft }]}>
                  <Ionicons name="person" size={20} color={colors.textInverse} />
                </View>
              )}
            </Pressable>

            <Pressable style={[styles.bellButton, { backgroundColor: colors.navySoft }]}>
              <Ionicons name="notifications-outline" size={IconSize.md} color={colors.textInverse} />
              <View style={[styles.bellDot, { backgroundColor: colors.expense, borderColor: colors.navy }]} />
            </Pressable>
          </View>

          {/* Balance card — mint gradient with scattered triangle/circle pattern */}
          <LinearGradient
            colors={[colors.primary, colors.primaryHover]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.balanceCard}>
            {/* Decorative pattern layer — clipped to the card, sits behind the text */}
            <View style={styles.patternLayer} pointerEvents="none">
              <View style={[styles.shapeCircle, styles.shapeLight, { width: 46, height: 46, top: -16, left: 18 }]} />
              <View style={[styles.shapeCircle, styles.shapeDark, { width: 30, height: 30, top: 54, left: 96 }]} />
              <View style={[styles.shapeCircle, styles.shapeLight, { width: 34, height: 34, top: 8, right: 54 }]} />
              <View style={[styles.shapeCircle, styles.shapeDark, { width: 60, height: 60, bottom: -28, right: -10 }]} />

              <View
                style={[
                  styles.triangle,
                  styles.shapeLight,
                  { top: -6, left: 74, transform: [{ rotate: '18deg' }] },
                ]}
              />
              <View
                style={[
                  styles.triangleLg,
                  styles.shapeDark,
                  { top: 30, left: -14, transform: [{ rotate: '-8deg' }] },
                ]}
              />
              <View
                style={[
                  styles.triangleLg,
                  styles.shapeLight,
                  { bottom: -18, left: 120, transform: [{ rotate: '164deg' }] },
                ]}
              />
              <View
                style={[
                  styles.triangle,
                  styles.shapeDark,
                  { bottom: 10, right: 90, transform: [{ rotate: '210deg' }] },
                ]}
              />
              <View
                style={[
                  styles.triangleLg,
                  styles.shapeLight,
                  { top: 4, right: -16, transform: [{ rotate: '96deg' }] },
                ]}
              />
            </View>

            <View style={styles.balanceTopRow}>
              <Text style={[styles.balanceLabel, { color: colors.onPrimaryText }]}>Your current balance</Text>
              <Pressable onPress={toggleBalanceVisible} hitSlop={8}>
                <Ionicons
                  name={balanceVisible ? 'eye-outline' : 'eye-off-outline'}
                  size={IconSize.md}
                  color={colors.onPrimaryText}
                />
              </Pressable>
            </View>
            <Text style={[styles.balanceAmount, { color: colors.onPrimaryText }]}>
              {balanceVisible ? formatCurrencyFull(totalBalance, userCurrency) : '••••••'}
            </Text>
          </LinearGradient>

          {/* Quick actions — 4 circular buttons on navy */}
          <View style={styles.actionRow}>
            <Pressable style={styles.actionItem} onPress={() => router.push('/add-expense')}>
              <View style={[styles.actionCircle, { backgroundColor: colors.navyElevated }]}>
                <Ionicons name="paper-plane-outline" size={IconSize.md} color={colors.textInverse} />
              </View>
              <Text style={styles.actionLabel}>Send</Text>
            </Pressable>

            <Pressable style={styles.actionItem} onPress={() => router.push('/add-income')}>
              <View style={[styles.actionCircle, { backgroundColor: colors.navyElevated }]}>
                <Ionicons name="arrow-down-outline" size={IconSize.md} color={colors.textInverse} />
              </View>
              <Text style={styles.actionLabel}>Request</Text>
            </Pressable>

            <Pressable style={styles.actionItem} onPress={() => router.push('/transfer')}>
              <View style={[styles.actionCircle, { backgroundColor: colors.navyElevated }]}>
                <Ionicons name="add-outline" size={IconSize.lg} color={colors.textInverse} />
              </View>
              <Text style={styles.actionLabel}>Add</Text>
            </Pressable>

            <Pressable style={styles.actionItem} onPress={() => router.push('/(tabs)/profile')}>
              <View style={[styles.actionCircle, { backgroundColor: colors.navyElevated }]}>
                <Ionicons name="menu-outline" size={IconSize.md} color={colors.textInverse} />
              </View>
              <Text style={styles.actionLabel}>Menu</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      {/* White content area */}
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        {/* Search bar */}
        <View style={[styles.searchBar, { backgroundColor: colors.backgroundSubtle }]}>
          <Ionicons name="search-outline" size={IconSize.md} color={colors.textTertiary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search transactions..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            // onFocus={() => router.push('/(tabs)/transactions')}
            returnKeyType="search"
          />
        </View>

        {/* Savings goals — quick-access circles, same visual pattern as "Quick send" */}
        {activeGoals.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Savings goals</Text>
            <View style={styles.goalsRow}>
              {activeGoals.map((goal) => (
                <Pressable
                  key={goal.id}
                  style={styles.goalItem}
                  onPress={() => router.push('/(tabs)/savings')}>
                  <View style={[styles.goalCircle, { backgroundColor: colors.primarySoft }]}>
                    <Ionicons name={(goal.icon as any) || 'flag'} size={20} color={colors.primaryHover} />
                  </View>
                  <Text style={[styles.goalLabel, { color: colors.text }]} numberOfLines={1}>
                    {goal.name}
                  </Text>
                </Pressable>
              ))}
              <Pressable
                style={styles.goalItem}
                onPress={() => router.push('/(tabs)/savings')}>
                <View style={[styles.goalCircle, { backgroundColor: colors.backgroundSubtle }]}>
                  <Ionicons name="add" size={20} color={colors.textSecondary} />
                </View>
                <Text style={[styles.goalLabel, { color: colors.textSecondary }]}>New goal</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Transactions</Text>
            <Pressable
              style={[styles.allPill, { backgroundColor: colors.backgroundSubtle }]}
              onPress={() => router.push('/(tabs)/transactions')}>
              <Text style={[styles.allPillText, { color: colors.text }]}>All</Text>
              <Ionicons name="options-outline" size={14} color={colors.text} />
            </Pressable>
          </View>

          {recentTransactions.length === 0 ? (
            <View style={[styles.emptyState, { backgroundColor: colors.backgroundSubtle }]}>
              <Ionicons name="receipt-outline" size={40} style={{ marginBottom: Spacing.md, opacity: 0.5 }} color={colors.textSecondary} />
              <Text style={{ color: colors.textSecondary }}>No activity yet</Text>
            </View>
          ) : (
            <View style={styles.transactionsList}>
              {recentTransactions.map((transaction) => (
                <Pressable
                  key={transaction.id}
                  style={styles.transactionRow}
                  onPress={() => router.push('/(tabs)/transactions')}>
                  <View style={styles.transactionLeft}>
                    <View style={[styles.transactionIcon, { backgroundColor: colors.backgroundSubtle }]}>
                      <Ionicons
                        name={getIconName(transaction.type, transaction.category) as any}
                        size={IconSize.sm}
                        color={colors.text}
                      />
                    </View>
                    <View>
                      <Text style={[styles.transactionName, { color: colors.text }]}>
                        {transaction.type === 'income' ? 'Received' : 'Sent'} · {transaction.category}
                      </Text>
                      <Text style={[styles.transactionDate, { color: colors.textTertiary }]}>
                        {formatDate(transaction.date)}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.transactionAmount,
                      { color: transaction.type === 'income' ? colors.income : colors.expense },
                    ]}>
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount, userCurrency)}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  // Navy header section
  navySection: {
    // borderBottomLeftRadius: Radius.xl,
    // borderBottomRightRadius: Radius.xl,
  },
  navyContent: {
    paddingHorizontal: Layout.screenPadding,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xxxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
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
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
  },

  // Balance card
  balanceCard: {
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    paddingVertical: Spacing.xxxl,
    marginBottom: Spacing.xl,
    overflow: 'hidden',
  },
  patternLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  shapeCircle: {
    position: 'absolute',
    borderRadius: Radius.full,
  },
  triangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 16,
    borderRightWidth: 16,
    borderBottomWidth: 28,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  triangleLg: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 26,
    borderRightWidth: 26,
    borderBottomWidth: 46,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  shapeLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    borderBottomColor: 'rgba(255, 255, 255, 0.22)',
  },
  shapeDark: {
    backgroundColor: 'rgba(18, 59, 44, 0.10)',
    borderBottomColor: 'rgba(18, 59, 44, 0.10)',
  },
  balanceTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  balanceLabel: {
    fontFamily: 'Sora_500Medium',
    fontSize: 14,
    fontWeight: FontWeight.medium,
  },
  balanceAmount: {
    fontFamily: 'Sora_800ExtraBold',
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '800',
    letterSpacing: -0.5,
  },

  // Quick actions
  actionRow: {
    paddingTop: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  actionCircle: {
    width: 52,
    height: 52,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: FontWeight.medium,
    color: 'rgba(255,255,255,0.85)',
  },

  // White content area
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Layout.screenPadding,
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
    borderRadius: Radius.xl,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },

  section: {
    paddingHorizontal: Layout.screenPadding,
    marginBottom: Spacing.xl,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.title,
    marginBottom: Spacing.lg,
  },
  allPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.full,
    marginBottom: 0,
  },
  allPillText: {
    fontSize: 13,
    fontWeight: FontWeight.semibold,
  },

  // Savings goals row (quick-access circles)
  goalsRow: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  goalItem: {
    alignItems: 'center',
    gap: Spacing.sm,
    width: 64,
  },
  goalCircle: {
    width: 56,
    height: 56,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalLabel: {
    fontSize: 12,
    fontWeight: FontWeight.medium,
    textAlign: 'center',
  },

  // Transactions
  emptyState: {
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  transactionsList: {
    gap: Spacing.sm,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
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
    fontSize: 14,
    fontWeight: FontWeight.semibold,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: FontWeight.semibold,
  },
});