import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';

const SPENDING_DATA = [
  { category: 'Food & Dining', amount: 85000, percentage: 34, icon: 'restaurant-outline', color: '#FF6B6B' },
  { category: 'Transport', amount: 45000, percentage: 18, icon: 'car-outline', color: '#4ECDC4' },
  { category: 'Shopping', amount: 35000, percentage: 14, icon: 'cart-outline', color: '#FFE66D' },
  { category: 'Entertainment', amount: 30000, percentage: 12, icon: 'film-outline', color: '#A8E6CF' },
  { category: 'Bills', amount: 40000, percentage: 16, icon: 'receipt-outline', color: '#FF8B94' },
  { category: 'Others', amount: 15000, percentage: 6, icon: 'ellipsis-horizontal', color: '#C7CEEA' },
];

export default function AnalyticsScreen() {
  const colors = Colors.light;

  const totalSpent = SPENDING_DATA.reduce((sum, item) => sum + item.amount, 0);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Analytics</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>December 2024</Text>
      </View>

      {/* Total Spent Card */}
      <View style={[styles.card, { backgroundColor: colors.backgroundElevated }]}>
        <Text style={[styles.cardLabel, { color: colors.textSecondary }]}>Total Spent</Text>
        <Text style={[styles.totalAmount, { color: colors.text }]}>
          ₦{totalSpent.toLocaleString()}
        </Text>
        <Text style={[styles.comparison, { color: '#34C759' }]}>
          <Ionicons name="trending-down" size={14} /> 8% less than last month
        </Text>
      </View>

      {/* Spending by Category */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Spending by Category</Text>
        
        {SPENDING_DATA.map((item, index) => (
          <View key={index} style={[styles.categoryItem, { backgroundColor: colors.backgroundElevated }]}>
            <View style={styles.categoryLeft}>
              <View style={[styles.categoryIcon, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon as any} size={20} color={item.color} />
              </View>
              <View style={styles.categoryInfo}>
                <Text style={[styles.categoryName, { color: colors.text }]}>{item.category}</Text>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${item.percentage}%`, backgroundColor: item.color },
                    ]}
                  />
                </View>
              </View>
            </View>
            <View style={styles.categoryRight}>
              <Text style={[styles.categoryAmount, { color: colors.text }]}>
                ₦{item.amount.toLocaleString()}
              </Text>
              <Text style={[styles.categoryPercentage, { color: colors.textSecondary }]}>
                {item.percentage}%
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Monthly Trend */}
      <View style={[styles.section, { marginBottom: 100 }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Monthly Trend</Text>
        <View style={[styles.trendCard, { backgroundColor: colors.backgroundElevated }]}>
          <View style={styles.monthsContainer}>
            {['Oct', 'Nov', 'Dec'].map((month, index) => (
              <View key={month} style={styles.monthItem}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: [120, 100, 80][index],
                      backgroundColor: index === 2 ? colors.primary : colors.primarySoft,
                    },
                  ]}
                />
                <Text style={[styles.monthLabel, { color: colors.textSecondary }]}>{month}</Text>
              </View>
            ))}
          </View>
          <Text style={[styles.trendNote, { color: colors.textSecondary }]}>
            Your spending decreased by 8% this month
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
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 24,
    borderRadius: 12,
  },
  cardLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  comparison: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#EBEBEB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  categoryRight: {
    alignItems: 'flex-end',
  },
  categoryAmount: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  categoryPercentage: {
    fontSize: 12,
  },
  trendCard: {
    padding: 24,
    borderRadius: 12,
  },
  monthsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 150,
    marginBottom: 16,
  },
  monthItem: {
    alignItems: 'center',
    gap: 8,
  },
  bar: {
    width: 60,
    borderRadius: 8,
  },
  monthLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  trendNote: {
    fontSize: 13,
    textAlign: 'center',
  },
});
