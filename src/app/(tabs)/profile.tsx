import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';

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

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Profile Header */}
      <LinearGradient
        colors={[colors.primary, colors.primaryEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#FFFFFF" />
          </View>
          <Pressable style={styles.editButton}>
            <Ionicons name="camera" size={16} color="#FFFFFF" />
          </Pressable>
        </View>
        <Text style={styles.userName}>Miracle Adeosun</Text>
        <Text style={styles.userEmail}>miracle@denari.app</Text>
      </LinearGradient>

      {/* Account Overview */}
      <View style={[styles.statsContainer, { backgroundColor: colors.backgroundElevated }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text }]}>₦350,000</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Budget</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text }]}>₦250,000</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Spent</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text }]}>42</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Transactions</Text>
        </View>
      </View>

      {/* Menu Items */}
      {MENU_ITEMS.map((section, index) => (
        <View key={index} style={styles.menuSection}>
          <Text style={[styles.menuSectionTitle, { color: colors.textSecondary }]}>
            {section.title}
          </Text>
          <View style={[styles.menuCard, { backgroundColor: colors.backgroundElevated }]}>
            {section.items.map((item, itemIndex) => (
              <View key={itemIndex}>
                <Pressable
                  style={styles.menuItem}
                  onPress={() => console.log(item.route)}>
                  <View style={styles.menuItemLeft}>
                    <Ionicons name={item.icon as any} size={22} color={colors.text} />
                    <Text style={[styles.menuItemLabel, { color: colors.text }]}>
                      {item.label}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                </Pressable>
                {itemIndex < section.items.length - 1 && (
                  <View style={[styles.menuDivider, { backgroundColor: colors.border }]} />
                )}
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* Logout Button */}
      <Pressable
        style={[styles.logoutButton, { backgroundColor: colors.backgroundElevated }]}
        onPress={() => router.replace('/(auth)/welcome')}>
        <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 32,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FD7E15',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: -20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: '100%',
  },
  menuSection: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  menuSectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  menuCard: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  menuDivider: {
    height: 1,
    marginLeft: 50,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 24,
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
  },
});
