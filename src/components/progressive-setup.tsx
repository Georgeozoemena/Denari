import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

interface SetupItem {
  id: string;
  label: string;
  icon: string;
  completed: boolean;
  route?: string;
}

export function ProgressiveSetup() {
  const router = useRouter();
  const colors = Colors.light;
  const { user, transactions, budgets, savingsGoals, wallets } = useApp();
  const [isDismissed, setIsDismissed] = useState(false);

  // Calculate setup progress
  const setupItems: SetupItem[] = [
    {
      id: 'account',
      label: 'Account created',
      icon: 'checkmark-circle',
      completed: true,
    },
    {
      id: 'currency',
      label: 'Currency selected',
      icon: 'cash',
      completed: !!user?.currency,
    },
    {
      id: 'wallet',
      label: 'Wallet added',
      icon: 'wallet',
      completed: wallets.length > 0,
    },
    {
      id: 'transaction',
      label: 'Add your first transaction',
      icon: 'swap-horizontal',
      completed: transactions.length > 0,
      route: '/add-expense',
    },
    {
      id: 'budget',
      label: 'Create a budget',
      icon: 'pie-chart',
      completed: budgets.length > 0,
    },
    {
      id: 'savings',
      label: 'Set a savings goal',
      icon: 'trophy',
      completed: savingsGoals.length > 0,
    },
  ];

  const completedCount = setupItems.filter((item) => item.completed).length;
  const totalCount = setupItems.length;
  const allCompleted = completedCount === totalCount;

  if (isDismissed) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundElevated }]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="rocket" size={20} color={colors.primary} />
          <Text style={[styles.title, { color: colors.text }]}>
            {allCompleted ? "You're all set! 🎉" : 'Complete your setup'}
          </Text>
        </View>
        <Pressable onPress={() => setIsDismissed(true)}>
          <Ionicons name="close" size={20} color={colors.textSecondary} />
        </Pressable>
      </View>

      {!allCompleted && (
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: colors.borderLight }]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${(completedCount / totalCount) * 100}%`,
                  backgroundColor: colors.primary,
                },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: colors.textSecondary }]}>
            {completedCount} of {totalCount} completed
          </Text>
        </View>
      )}

      <View style={styles.items}>
        {setupItems.map((item) => (
          <Pressable
            key={item.id}
            style={styles.item}
            onPress={() => item.route && !item.completed && router.push(item.route as any)}
            disabled={item.completed || !item.route}>
            <View style={styles.itemLeft}>
              <Ionicons
                name={item.completed ? 'checkmark-circle' : (item.icon as any)}
                size={18}
                color={item.completed ? colors.income : colors.textSecondary}
              />
              <Text
                style={[
                  styles.itemLabel,
                  {
                    color: item.completed ? colors.textSecondary : colors.text,
                    textDecorationLine: item.completed ? 'line-through' : 'none',
                  },
                ]}>
                {item.label}
              </Text>
            </View>
            {!item.completed && item.route && (
              <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
            )}
          </Pressable>
        ))}
      </View>

      {allCompleted && (
        <Text style={[styles.completeMessage, { color: colors.textSecondary }]}>
          You've completed all setup steps. Great job!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  progressContainer: {
    gap: 6,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
  },
  items: {
    gap: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  completeMessage: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
});
