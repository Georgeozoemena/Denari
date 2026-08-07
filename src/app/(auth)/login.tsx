import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SocialButton } from '@/components/ui/social-button';
import { Colors } from '@/constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const colors = Colors.light;

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    router.push('/(auth)/enter-pin');
  };

  const handleSocialLogin = (provider: string) => {
    console.log('Social login:', provider);
  };

  return (
    <ScrollView style={[styles.scrollView, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={[styles.backIcon, { color: colors.text }]}>←</Text>
        </Pressable>

        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Log In</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Welcome back! Please log in to continue
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email or Phone Number"
            placeholder="Enter email or phone number"
            autoCapitalize="none"
            value={identifier}
            onChangeText={setIdentifier}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Pressable
            style={styles.forgotBtn}
            onPress={() => router.push('/(auth)/forgot-password')}>
            <Text style={[styles.forgotText, { color: colors.primary }]}>Forgot Password?</Text>
          </Pressable>

          <Button
            title="Log In"
            onPress={handleLogin}
            style={styles.submitBtn}
          />

          <View style={styles.dividerContainer}>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textSecondary }]}>
              or continue with
            </Text>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
          </View>

          <View style={styles.socialButtons}>
            <SocialButton
              provider="google"
              onPress={() => handleSocialLogin('google')}
              style={styles.socialButton}
            />
            <SocialButton
              provider="apple"
              onPress={() => handleSocialLogin('apple')}
              style={styles.socialButton}
            />
          </View>

          <View style={styles.signUpRow}>
            <Text style={[styles.signUpText, { color: colors.textSecondary }]}>
              Don't have an account?{' '}
            </Text>
            <Pressable onPress={() => router.push('/(auth)/sign-up')}>
              <Text style={[styles.signUpLink, { color: colors.primary }]}>Sign up</Text>
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
  form: {
    gap: 4,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: 4,
    marginBottom: 16,
  },
  forgotText: {
    fontWeight: '600',
    fontSize: 14,
  },
  submitBtn: {
    marginBottom: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  socialButton: {
    flex: 1,
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  signUpText: {
    fontSize: 15,
  },
  signUpLink: {
    fontSize: 15,
    fontWeight: '600',
  },
});
