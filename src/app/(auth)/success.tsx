import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.checkCircle}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
          <View style={styles.particle1} />
          <View style={styles.particle2} />
          <View style={styles.particle3} />
          <View style={styles.particle4} />
        </View>

        <Text style={styles.title}>Welcome to DENARI! 🎉</Text>
        <Text style={styles.subtitle}>
          Your account has been created successfully.
        </Text>

        <View style={styles.stepsContainer}>
          <Text style={styles.stepsTitle}>What's next?</Text>
          <View style={styles.step}>
            <View style={styles.stepDot}>
              <Text style={styles.stepCheck}>✓</Text>
            </View>
            <Text style={styles.stepText}>Track your expenses</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepDot}>
              <Text style={styles.stepCheck}>✓</Text>
            </View>
            <Text style={styles.stepText}>Create a budget</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepDot}>
              <Text style={styles.stepCheck}>✓</Text>
            </View>
            <Text style={styles.stepText}>Set savings goals</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepDot}>
              <Text style={styles.stepCheck}>✓</Text>
            </View>
            <Text style={styles.stepText}>Achieve financial freedom</Text>
          </View>
        </View>
      </View>

      <Button
        title="Go to Dashboard"
        onPress={() => router.replace('/(tabs)')}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 24,
    paddingTop: 80,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  iconContainer: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  checkCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FD7E15',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FD7E15',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  checkMark: {
    fontSize: 56,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  particle1: {
    position: 'absolute',
    top: 20,
    right: 10,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFB870',
  },
  particle2: {
    position: 'absolute',
    top: 40,
    left: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFCA94',
  },
  particle3: {
    position: 'absolute',
    bottom: 30,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FD7E15',
  },
  particle4: {
    position: 'absolute',
    bottom: 40,
    left: 10,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFB870',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7E7E7E',
    textAlign: 'center',
    lineHeight: 24,
  },
  stepsContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    gap: 16,
    marginTop: 12,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF0E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCheck: {
    fontSize: 12,
    color: '#FD7E15',
    fontWeight: '700',
  },
  stepText: {
    fontSize: 15,
    color: '#1A1A1A',
  },
  button: {
    marginBottom: 20,
  },
});
