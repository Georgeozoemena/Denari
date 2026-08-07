import { useRouter } from 'expo-router';
import {
    Dimensions,
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { Button } from '@/components/ui/button';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9F2" />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.brandText}>DENARI</Text>
          <Text style={styles.subtitle}>
            Your personal finance companion
          </Text>
        </View>

        {/* Hero Illustration */}
        <View style={styles.illustrationWrapper}>
          <View style={styles.illustrationContainer}>
            {/* Soft warm background glow */}
            <View style={styles.backgroundGlow} />

            {/* Floating Elements */}
            <View style={[styles.floatingCard, styles.floatingLeft]}>
              <View style={styles.walletIcon} />
            </View>

            <View style={[styles.floatingCard, styles.floatingRight]}>
              <View style={styles.notificationIcon} />
            </View>

            {/* Main Phone Mockup */}
            <View style={styles.phoneFrame}>
              <View style={styles.phoneNotch} />
              <View style={styles.phoneScreen}>
                <Text style={styles.screenTitle}>Total Balance</Text>
                <Text style={styles.balance}>₦250,000.00</Text>

                <View style={styles.statsContainer}>
                  <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Income</Text>
                    <Text style={styles.income}>₦320,000.00</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Expenses</Text>
                    <Text style={styles.expense}>₦120,000.00</Text>
                  </View>
                </View>

                {/* Improved Donut Chart */}
                <View style={styles.chartWrapper}>
                  <View style={styles.donutOuter}>
                    <View style={styles.donutInner} />
                  </View>
                  <View style={styles.chartCenterContent}>
                    <Text style={styles.chartPercentage}>65%</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Gold Coin Stacks */}
            <View style={styles.coinStackLeft}>
              {[1, 2, 3].map((i) => (
                <View key={i} style={[styles.coin, { transform: [{ translateY: (i - 1) * -14 }] }]} />
              ))}
            </View>

            <View style={styles.coinStackRight}>
              {[1, 2, 3, 4].map((i) => (
                <View key={i} style={[styles.coin, { transform: [{ translateY: (i - 1) * -14 }] }]} />
              ))}
            </View>
          </View>
        </View>

        {/* Pagination */}
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.footer}>
        <Button
          title="Get Started"
          onPress={() => router.push('/(auth)/sign-up')}
          style={styles.primaryButton}
        />

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Pressable onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.loginLink}>Log in</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F2', // Warm, premium off-white
  },
  content: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 28,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  brandText: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FD7E15',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '500',
  },

  illustrationWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    width: width * 0.85,
    height: width * 0.85,
    maxHeight: 420,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: 'rgba(253, 126, 21, 0.09)',
    transform: [{ scale: 1.15 }],
  },

  /* Floating Cards */
  floatingCard: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#FD7E15',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
    zIndex: 10,
  },
  floatingLeft: {
    left: -10,
    top: '22%',
    transform: [{ rotate: '-8deg' }],
  },
  floatingRight: {
    right: -8,
    top: '32%',
    transform: [{ rotate: '6deg' }],
  },
  walletIcon: {
    width: 32,
    height: 28,
    backgroundColor: '#FD7E15',
    borderRadius: 6,
    position: 'relative',
  },
  notificationIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#FD7E15',
  },

  /* Phone */
  phoneFrame: {
    width: 255,
    height: 510,
    backgroundColor: '#111827',
    borderRadius: 44,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 15,
    zIndex: 20,
  },
  phoneNotch: {
    width: 110,
    height: 28,
    backgroundColor: '#111827',
    borderRadius: 14,
    alignSelf: 'center',
    marginBottom: 8,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 36,
    padding: 20,
    overflow: 'hidden',
  },
  screenTitle: {
    color: '#FD7E15',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  balance: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 14,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  income: {
    color: '#10B981',
    fontWeight: '700',
    fontSize: 15,
  },
  expense: {
    color: '#EF4444',
    fontWeight: '700',
    fontSize: 15,
  },

  /* Chart */
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  donutOuter: {
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutInner: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#FFFFFF',
    borderWidth: 18,
    borderColor: '#FD7E15',
    borderTopColor: '#10B981',
    borderRightColor: '#3B82F6',
    borderBottomColor: '#F59E0B',
  },
  chartCenterContent: {
    position: 'absolute',
    alignItems: 'center',
  },
  chartPercentage: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },

  /* Coins */
  coinStackLeft: {
    position: 'absolute',
    left: 12,
    bottom: 65,
    zIndex: 15,
  },
  coinStackRight: {
    position: 'absolute',
    right: 18,
    bottom: 95,
    zIndex: 15,
  },
  coin: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FBBF24',
    borderWidth: 3,
    borderColor: '#F59E0B',
    shadowColor: '#B45309',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  /* Pagination */
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 9,
    marginVertical: 32,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#E2E8F0',
  },
  dotActive: {
    backgroundColor: '#FD7E15',
    width: 28,
  },

  /* Footer */
  footer: {
    paddingHorizontal: 28,
    paddingBottom: 32,
    gap: 20,
  },
  primaryButton: {
    backgroundColor: '#FD7E15',
    height: 58,
    borderRadius: 12,
    shadowColor: '#FD7E15',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#64748B',
    fontSize: 15.5,
  },
  loginLink: {
    color: '#FD7E15',
    fontWeight: '700',
    fontSize: 15.5,
  },
});