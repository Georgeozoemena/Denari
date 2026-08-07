import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Colors } from '@/constants/theme';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const colors = Colors.light;

  const [identifier, setIdentifier] = useState('');

  const handleSendResetLink = () => {
    router.push({
      pathname: '/(auth)/verify-otp',
      params: { resetPassword: 'true' },
    });
  };

  return (
    <ScrollView style={[styles.scrollView, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={[styles.backIcon, { color: colors.text }]}>←</Text>
        </Pressable>

        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Forgot Password</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Enter your email or phone number and we'll send you a reset link.
          </Text>
        </View>

        <View style={styles.content}>
          <View style={[styles.illustrationContainer, { backgroundColor: colors.primarySoft }]}>
            <View style={[styles.envelope, { backgroundColor: colors.primary }]}>
              <View style={styles.envelopeFlap} />
              <View style={styles.lockIcon}>
                <Text style={styles.lockEmoji}>🔒</Text>
              </View>
            </View>
          </View>

          <View style={styles.form}>
            <Input
              label="Email or Phone Number"
              placeholder="Enter email or phone number"
              autoCapitalize="none"
              value={identifier}
              onChangeText={setIdentifier}
            />

            <Button
              title="Send Reset Link"
              onPress={handleSendResetLink}
              style={styles.submitBtn}
            />

            <Pressable
              style={styles.backToLogin}
              onPress={() => router.push('/(auth)/login')}>
              <Text style={[styles.backToLoginText, { color: colors.primary }]}>
                Back to Log In
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 24,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 16,
  },
  backIcon: {
    fontSize: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 6,
    lineHeight: 22,
  },
  content: {
    gap: 32,
  },
  illustrationContainer: {
    height: 200,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  envelope: {
    width: 120,
    height: 90,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  envelopeFlap: {
    position: 'absolute',
    top: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 60,
    borderRightWidth: 60,
    borderTopWidth: 45,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FE8535',
  },
  lockIcon: {
    backgroundColor: '#FFFFFF',
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  lockEmoji: {
    fontSize: 24,
  },
  form: {
    gap: 12,
  },
  submitBtn: {
    marginTop: 10,
  },
  backToLogin: {
    alignSelf: 'center',
    marginTop: 12,
  },
  backToLoginText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
