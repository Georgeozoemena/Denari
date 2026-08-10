import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors, Elevation, FontWeight, IconSize, Layout, Radius, Spacing, Typography } from '@/constants/theme';

const QUICK_ACTIONS = [
  {
    label: 'Add Expense',
    sublabel: 'Track spending',
    icon: 'arrow-up' as const,
    route: '/add-expense',
    iconBg: Colors.light.expenseSoft,
    iconColor: Colors.light.expense,
  },
  {
    label: 'Add Income',
    sublabel: 'Record earnings',
    icon: 'arrow-down' as const,
    route: '/add-income',
    iconBg: Colors.light.incomeSoft,
    iconColor: Colors.light.income,
  },
  {
    label: 'Transfer',
    sublabel: 'Between accounts',
    icon: 'swap-horizontal-outline' as const,
    route: '/transfer',
    iconBg: Colors.light.primarySoft,
    iconColor: Colors.light.primary,
  },
  {
    label: 'Create Budget',
    sublabel: 'Plan your month',
    icon: 'pie-chart-outline' as const,
    route: '/create-budget',
    iconBg: Colors.light.primarySoft,
    iconColor: Colors.light.primary,
  },
];

export default function AddScreen() {
  const router = useRouter();
  const colors = Colors.light;
  const cardBorder = { borderWidth: 1, borderColor: colors.border };

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundSubtle }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Quick Add</Text>
        </View>

        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Choose what you'd like to record
        </Text>

        <View style={styles.actionGrid}>
          {QUICK_ACTIONS.map((action) => (
            <Pressable
              key={action.route}
              style={[styles.actionCard, cardBorder, { backgroundColor: colors.backgroundElevated }]}
              onPress={() => router.push(action.route as any)}>
              <View style={[styles.actionIcon, { backgroundColor: action.iconBg }]}>
                <Ionicons name={action.icon} size={IconSize.lg} color={action.iconColor} />
              </View>
              <Text style={[styles.actionLabel, { color: colors.text }]}>{action.label}</Text>
              <Text style={[styles.actionSublabel, { color: colors.textSecondary }]}>{action.sublabel}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={[styles.listBar, cardBorder, { backgroundColor: colors.backgroundElevated }]}
          onPress={() => router.push('/create-goal')}>
          <View style={[styles.listBarIcon, { backgroundColor: colors.primarySoft }]}>
            <Ionicons name="flag-outline" size={IconSize.md} color={colors.primary} />
          </View>
          <View style={styles.listBarContent}>
            <Text style={[styles.listBarTitle, { color: colors.text }]}>Create Savings Goal</Text>
            <Text style={[styles.listBarSubtitle, { color: colors.textSecondary }]}>
              Set a target and track progress
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={IconSize.md} color={colors.textTertiary} />
        </Pressable>

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
    marginBottom: Spacing.sm,
  },
  title: {
    ...Typography.heading,
  },
  subtitle: {
    ...Typography.caption,
    marginBottom: Spacing.xl,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  actionCard: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: Radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
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
  actionLabel: {
    ...Typography.caption,
    fontWeight: FontWeight.semibold,
    textAlign: 'center',
  },
  actionSublabel: {
    ...Typography.small,
    fontWeight: FontWeight.regular,
    textAlign: 'center',
  },
  listBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    gap: Spacing.md,
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
});
