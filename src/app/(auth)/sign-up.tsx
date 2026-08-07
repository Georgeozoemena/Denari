import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SocialButton } from '@/components/ui/social-button';
import { Colors } from '@/constants/theme';

export default function SignUpScreen() {
  const router = useRouter();
  const colors = Colors.light;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    router.push({
      pathname: '/(auth)/verify-otp',
      params: { phone: phone || email },
    });
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
          <Text style={[styles.title, { color: colors.text }]}>Sign Up</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Create your DENARI account
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />
          <Input
            label="Email"
            placeholder="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Phone Number"
            placeholder="🇳🇬 +234 Enter your phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <Input
            label="Password"
            placeholder="Create a password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <View style={[styles.requirementBox, { backgroundColor: colors.primarySoft }]}>
            <Text style={[styles.requirementText, { color: colors.primary }]}>
              ✓ At least 8 characters{"\n"}
              ✓ Include a number{"\n"}
              ✓ Include a special character
            </Text>
          </View>

          <Button
            title="Create Account"
            onPress={handleRegister}
            style={styles.submitBtn}
          />

          <View style={styles.dividerContainer}>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textSecondary }]}>
              or sign up with
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

          <View style={styles.loginRow}>
            <Text style={[styles.loginText, { color: colors.textSecondary }]}>
              Already have an account?{' '}
            </Text>
            <Pressable onPress={() => router.push('/(auth)/login')}>
              <Text style={[styles.loginLink, { color: colors.primary }]}>Log In</Text>
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
  },
  form: {
    gap: 4,
  },
  requirementBox: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    marginTop: 8,
  },
  requirementText: {
    fontSize: 13,
    lineHeight: 20,
  },
  submitBtn: {
    marginTop: 12,
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
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  loginText: {
    fontSize: 15,
  },
  loginLink: {
    fontSize: 15,
    fontWeight: '600',
  },
});
