import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

export default function TransactionsScreen() {
  const colors = Colors.light;
  const { transactions } = useApp();
  const [filter, setFilter] = useState('all');

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === 'income') return transaction.type === 'income';
    if (filter === 'expense') return transaction.type === 'expense';
    return true;
  });

  const getIconName = (type: string, category: string): string => {
    if (type === 'transfer') return 'swap-horizontal-outline';
    if (type === 'income') return 'arrow-down-circle-outline';
    // Expense icons based on category
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
      'Investment': 'trending-up-outline',
      'Gift': 'gift-outline',
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
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Transactions</Text>
        <Pressable style={[styles.searchButton, { backgroundColor: colors.backgroundElevated }]}>
          <Ionicons name="search-outline" size={20} color={colors.text} />
        </Pressable>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {['all', 'income', 'expense'].map((tab) => (
          <Pressable
            key={tab}
            style={[
              styles.filterTab,
              {
                backgroundColor: filter === tab ? colors.primary : colors.backgroundElevated,
                borderColor: colors.border,
              },
            ]}
            onPress={() => setFilter(tab)}>
            <Text
              style={[
                styles.filterText,
                { color: filter === tab ? '#FFFFFF' : colors.text },
              ]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Transactions List */}
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {filteredTransactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={64} color={colors.textTertiary} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No transactions yet
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.textTertiary }]}>
              Add your first transaction to get started
            </Text>
          </View>
        ) : (
          filteredTransactions.map((transaction) => (
            <Pressable
              key={transaction.id}
              style={[styles.transactionItem, { backgroundColor: colors.backgroundElevated }]}>
              <View style={styles.transactionLeft}>
                <View style={[styles.iconContainer, { backgroundColor: colors.primarySoft }]}>
                  <Ionicons 
                    name={getIconName(transaction.type, transaction.category) as any} 
                    size={20} 
                    color={colors.primary} 
                  />
                </View>
                <View>
                  <Text style={[styles.transactionName, { color: colors.text }]}>
                    {transaction.category}
                  </Text>
                  {transaction.notes && (
                    <Text style={[styles.transactionCategory, { color: colors.textSecondary }]}>
                      {transaction.notes}
                    </Text>
                  )}
                  <Text style={[styles.transactionDate, { color: colors.textSecondary }]}>
                    {formatDate(transaction.date)}
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  styles.amount,
                  { color: transaction.type === 'income' ? '#34C759' : transaction.type === 'transfer' ? '#007AFF' : '#FF3B30' },
                ]}>
                {transaction.type === 'income' ? '+' : transaction.type === 'transfer' ? '' : '-'}
                ₦{transaction.amount.toLocaleString()}
              </Text>
            </Pressable>
          ))
        )}
      </ScrollView>
    </View>
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
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 16,
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  list: {
    flex: 1,
    paddingHorizontal: 24,
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    gap: 12,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  transactionCategory: {
    fontSize: 12,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
});
