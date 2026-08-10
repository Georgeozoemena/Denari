import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors, Elevation, FontWeight, IconSize, Layout, Radius, Spacing, Typography } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { formatCurrencyFull } from '@/utils/currency';

type FilterTab = 'all' | 'income' | 'expense';

export default function TransactionsScreen() {
  const colors = Colors.light;
  const { user, transactions } = useApp();
  const [filter, setFilter] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const userCurrency = user?.currency || 'NGN';
  const cardBorder = { borderWidth: 1, borderColor: colors.border };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'income' && transaction.type === 'income') ||
        (filter === 'expense' && transaction.type === 'expense');

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        transaction.category.toLowerCase().includes(query) ||
        transaction.notes?.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [transactions, filter, searchQuery]);

  const { totalIncome, totalExpense } = useMemo(() => {
    const income = filteredTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = filteredTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return { totalIncome: income, totalExpense: expense };
  }, [filteredTransactions]);

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
      Investment: 'trending-up-outline',
      Gift: 'gift-outline',
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
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getAmountColor = (type: string) => {
    if (type === 'income') return colors.income;
    if (type === 'transfer') return colors.info;
    return colors.text;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundSubtle }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Activity</Text>
          <Pressable style={[styles.headerIconButton, cardBorder, { backgroundColor: colors.backgroundElevated }]}>
            <Ionicons name="options-outline" size={IconSize.md} color={colors.text} />
          </Pressable>
        </View>

        {/* Search */}
        <View style={[styles.searchBar, cardBorder, { backgroundColor: colors.backgroundElevated }]}>
          <Ionicons name="search-outline" size={IconSize.md} color={colors.textTertiary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search transactions..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={IconSize.md} color={colors.textTertiary} />
            </Pressable>
          )}
        </View>

        {/* Summary card */}
        <View style={[styles.summaryCard, cardBorder, { backgroundColor: colors.backgroundElevated }]}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Income</Text>
            <Text style={[styles.summaryValue, { color: colors.income }]}>
              +{formatCurrencyFull(totalIncome, userCurrency)}
            </Text>
          </View>
          <View style={[styles.summaryDivider, { backgroundColor: colors.borderLight }]} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Expenses</Text>
            <Text style={[styles.summaryValue, { color: colors.expense }]}>
              -{formatCurrencyFull(totalExpense, userCurrency)}
            </Text>
          </View>
        </View>

        {/* Filter pills */}
        <View style={[styles.filterContainer, cardBorder, { backgroundColor: colors.backgroundElevated }]}>
          {(['all', 'income', 'expense'] as FilterTab[]).map((tab) => (
            <Pressable
              key={tab}
              style={[
                styles.filterTab,
                filter === tab && { backgroundColor: colors.primary },
              ]}
              onPress={() => setFilter(tab)}>
              <Text
                style={[
                  styles.filterText,
                  { color: filter === tab ? '#FFFFFF' : colors.textSecondary },
                ]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Transactions list */}
        {filteredTransactions.length === 0 ? (
          <View style={[styles.emptyCard, cardBorder, { backgroundColor: colors.backgroundElevated }]}>
            <View style={[styles.emptyIcon, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="receipt-outline" size={32} color={colors.primary} />
            </View>
            <Text style={[styles.emptyText, { color: colors.text }]}>No transactions found</Text>
            <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
              {searchQuery ? 'Try a different search term' : 'Add your first transaction to get started'}
            </Text>
          </View>
        ) : (
          <View style={[styles.transactionsCard, cardBorder, { backgroundColor: colors.backgroundElevated }]}>
            {filteredTransactions.map((transaction, index) => (
              <Pressable
                key={transaction.id}
                style={[
                  styles.transactionItem,
                  index < filteredTransactions.length - 1 && [
                    styles.transactionBorder,
                    { borderBottomColor: colors.borderLight },
                  ],
                ]}>
                <View style={styles.transactionLeft}>
                  <View
                    style={[
                      styles.iconContainer,
                      {
                        backgroundColor:
                          transaction.type === 'income'
                            ? colors.incomeSoft
                            : transaction.type === 'transfer'
                              ? colors.primarySoft
                              : colors.expenseSoft,
                      },
                    ]}>
                    <Ionicons
                      name={getIconName(transaction.type, transaction.category) as any}
                      size={IconSize.sm}
                      color={
                        transaction.type === 'income'
                          ? colors.income
                          : transaction.type === 'transfer'
                            ? colors.primary
                            : colors.expense
                      }
                    />
                  </View>
                  <View style={styles.transactionInfo}>
                    <Text style={[styles.transactionName, { color: colors.text }]}>
                      {transaction.category}
                    </Text>
                    {transaction.notes ? (
                      <Text style={[styles.transactionNotes, { color: colors.textSecondary }]} numberOfLines={1}>
                        {transaction.notes}
                      </Text>
                    ) : null}
                    <Text style={[styles.transactionDate, { color: colors.textTertiary }]}>
                      {formatDate(transaction.date)}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.amount, { color: getAmountColor(transaction.type) }]}>
                  {transaction.type === 'income' ? '+' : transaction.type === 'transfer' ? '' : '-'}
                  {formatCurrencyFull(transaction.amount, userCurrency)}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Layout.screenPadding,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.heading,
  },
  headerIconButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...Elevation.soft,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
    borderRadius: Radius.xl,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
    ...Elevation.soft,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    marginBottom: Spacing.lg,
    ...Elevation.soft,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 40,
  },
  summaryLabel: {
    ...Typography.small,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: FontWeight.bold,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: Radius.lg,
    marginBottom: Spacing.lg,
    ...Elevation.soft,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: Radius.md,
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    fontWeight: FontWeight.semibold,
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
    marginRight: Spacing.sm,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    ...Typography.body,
    fontWeight: FontWeight.semibold,
    marginBottom: 2,
  },
  transactionNotes: {
    ...Typography.small,
    marginBottom: 2,
  },
  transactionDate: {
    ...Typography.small,
    fontWeight: FontWeight.regular,
  },
  amount: {
    ...Typography.body,
    fontWeight: FontWeight.bold,
  },
  emptyCard: {
    borderRadius: Radius.lg,
    padding: Spacing.xxxl,
    alignItems: 'center',
    gap: Spacing.md,
    ...Elevation.soft,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: Radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...Typography.title,
    fontSize: 18,
  },
  emptySubtext: {
    ...Typography.caption,
    textAlign: 'center',
  },
});
