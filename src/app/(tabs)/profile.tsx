import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Colors, Elevation, FontWeight, IconSize, Layout, Radius, Spacing, Typography } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { exportBudgetsCSV, exportSavingsGoalsCSV, exportTransactionsCSV } from '@/services/export';
import { formatCurrency } from '@/utils/currency';

const MENU_ITEMS = [
  {
    title: 'General',
    items: [
      { label: 'Personal Information', icon: 'person-outline', route: '/profile-info' },
      { label: 'Notifications', icon: 'notifications-outline', route: '/notifications' },
      { label: 'Privacy', icon: 'lock-closed-outline', route: '/privacy' },
    ],
  },
  {
    title: 'Financial',
    items: [
      { label: 'Linked Accounts', icon: 'card-outline', route: '/accounts' },
      { label: 'Bank Accounts', icon: 'business-outline', route: '/banks' },
      { label: 'Security', icon: 'shield-checkmark-outline', route: '/security' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { label: 'Currency', icon: 'cash-outline', route: '/currency' },
      { label: 'Language', icon: 'language-outline', route: '/language' },
      { label: 'Theme', icon: 'color-palette-outline', route: '/theme' },
    ],
  },
  {
    title: 'Data',
    items: [
      { label: 'Export Transactions', icon: 'download-outline', action: 'export-transactions' },
      { label: 'Export Budgets', icon: 'download-outline', action: 'export-budgets' },
      { label: 'Export Savings Goals', icon: 'download-outline', action: 'export-goals' },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'About DENARI', icon: 'information-circle-outline', route: '/about' },
      { label: 'Help & Support', icon: 'help-circle-outline', route: '/help' },
      { label: 'Rate Us', icon: 'star-outline', route: '/rate' },
    ],
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const colors = Colors.light;
  const { transactions, budgets, savingsGoals, user } = useApp();
  const [isExporting, setIsExporting] = useState(false);

  const cardBorder = { borderWidth: 1, borderColor: colors.border };
  const userCurrency = user?.currency || 'NGN';
  const monthlyIncome = budgets[0]?.monthlyIncome || 0;

  const handleExport = async (action: string) => {
    setIsExporting(true);
    try {
      switch (action) {
        case 'export-transactions':
          if (transactions.length === 0) {
            Alert.alert('No Data', 'You have no transactions to export');
            break;
          }
          await exportTransactionsCSV(transactions);
          Alert.alert('Success', 'Transactions exported successfully!');
          break;
        case 'export-budgets':
          if (budgets.length === 0) {
            Alert.alert('No Data', 'You have no budgets to export');
            break;
          }
          await exportBudgetsCSV(budgets);
          Alert.alert('Success', 'Budgets exported successfully!');
          break;
        case 'export-goals':
          if (savingsGoals.length === 0) {
            Alert.alert('No Data', 'You have no savings goals to export');
            break;
          }
          await exportSavingsGoalsCSV(savingsGoals);
          Alert.alert('Success', 'Savings goals exported successfully!');
          break;
      }
    } catch (error) {
      console.error('Export error:', error);
      Alert.alert('Export Failed', 'Failed to export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleMenuItemPress = (item: { action?: string; route?: string }) => {
    if (item.action) {
      handleExport(item.action);
    } else if (item.route) {
      console.log(item.route);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.backgroundSubtle }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}>
      <Text style={[styles.pageTitle, { color: colors.text }]}>Profile</Text>

      {/* Split profile card */}
      <View style={[styles.profileCardWrapper, cardBorder, Elevation.card]}>
        <LinearGradient
          colors={[colors.primary, colors.primaryHover]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileCardTop}>
          <View style={styles.avatarContainer}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatar}>
                <Ionicons name="person" size={36} color="#FFFFFF" />
              </View>
            )}
            <Pressable style={[styles.editAvatarButton, { backgroundColor: colors.backgroundElevated }]}>
              <Ionicons name="camera" size={14} color={colors.primary} />
            </Pressable>
          </View>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'email@denari.app'}</Text>
        </LinearGradient>

        <View style={[styles.statsContainer, { backgroundColor: colors.backgroundElevated }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {formatCurrency(monthlyIncome, userCurrency)}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Income</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.borderLight }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>{savingsGoals.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Goals</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.borderLight }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>{transactions.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Transactions</Text>
          </View>
        </View>
      </View>

      {/* Menu sections as list bars */}
      {MENU_ITEMS.map((section) => (
        <View key={section.title} style={styles.menuSection}>
          <Text style={[styles.menuSectionTitle, { color: colors.textSecondary }]}>{section.title}</Text>
          <View style={[styles.menuGroup, cardBorder, { backgroundColor: colors.backgroundElevated }]}>
            {section.items.map((item, itemIndex) => (
              <View key={item.label}>
                <Pressable
                  style={styles.menuItem}
                  onPress={() => handleMenuItemPress(item)}
                  disabled={isExporting && !!item.action}>
                  <View style={[styles.menuItemIcon, { backgroundColor: colors.primarySoft }]}>
                    <Ionicons name={item.icon as any} size={IconSize.sm} color={colors.primary} />
                  </View>
                  <Text style={[styles.menuItemLabel, { color: colors.text }]}>{item.label}</Text>
                  {isExporting && item.action ? (
                    <ActivityIndicator size="small" color={colors.primary} />
                  ) : (
                    <Ionicons name="chevron-forward" size={IconSize.md} color={colors.textTertiary} />
                  )}
                </Pressable>
                {itemIndex < section.items.length - 1 && (
                  <View style={[styles.menuDivider, { backgroundColor: colors.borderLight }]} />
                )}
              </View>
            ))}
          </View>
        </View>
      ))}

      <Pressable
        style={[styles.logoutButton, cardBorder, { backgroundColor: colors.backgroundElevated }]}
        onPress={() => router.replace('/(auth)/welcome')}>
        <View style={[styles.logoutIcon, { backgroundColor: colors.expenseSoft }]}>
          <Ionicons name="log-out-outline" size={IconSize.sm} color={colors.expense} />
        </View>
        <Text style={[styles.logoutText, { color: colors.expense }]}>Log Out</Text>
        <Ionicons name="chevron-forward" size={IconSize.md} color={colors.textTertiary} />
      </Pressable>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: Layout.screenPadding,
    paddingTop: 60,
  },
  pageTitle: {
    ...Typography.heading,
    marginBottom: Spacing.lg,
  },
  profileCardWrapper: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
  },
  profileCardTop: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: Radius.full,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: FontWeight.bold,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: Spacing.lg,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 16, fontWeight: FontWeight.bold, marginBottom: 4 },
  statLabel: { ...Typography.small, fontWeight: FontWeight.regular },
  statDivider: { width: 1, height: '100%' },
  menuSection: { marginBottom: Spacing.lg },
  menuSectionTitle: {
    ...Typography.small,
    fontWeight: FontWeight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.xs,
  },
  menuGroup: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Elevation.soft,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  menuItemIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemLabel: {
    flex: 1,
    ...Typography.body,
    fontWeight: FontWeight.medium,
  },
  menuDivider: { height: 1, marginLeft: 68 },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    gap: Spacing.md,
    ...Elevation.soft,
  },
  logoutIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    flex: 1,
    ...Typography.body,
    fontWeight: FontWeight.semibold,
  },
});
