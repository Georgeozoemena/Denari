import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Colors } from '@/constants/theme';

export default function ProfileSetupScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colors = Colors.light;

  // Pre-fill name from sign-up if available
  const [firstName, setFirstName] = useState((params.name as string)?.split(' ')[0] || '');
  const [lastName, setLastName] = useState((params.name as string)?.split(' ').slice(1).join(' ') || '');
  const email = params.email as string;
  const phone = params.phone as string;

  const handleContinue = () => {
    if (!firstName) {
      alert('Please enter your first name');
      return;
    }
    
    const fullName = `${firstName} ${lastName}`.trim();
    
    // Navigate to currency selection
    router.push({
      pathname: '/(auth)/choose-currency',
      params: { name: fullName, email, phone },
    });
  };

  return (
    <ScrollView style={[styles.scrollView, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>

        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Complete Your Profile</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Let's get to know you better
          </Text>
        </View>

        <View style={styles.avatarSection}>
          <Pressable style={[styles.avatarCircle, { backgroundColor: colors.primarySoft }]}>
            <Ionicons name="person" size={40} color={colors.primary} />
          </Pressable>
          <Pressable>
            <Text style={[styles.avatarText, { color: colors.primary }]}>Add Photo (Optional)</Text>
          </Pressable>
        </View>

        <View style={styles.form}>
          <Input
            label="First Name"
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <Input
            label="Last Name (Optional)"
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={setLastName}
          />

          <Button
            title="Continue"
            onPress={handleContinue}
            style={styles.submitBtn}
          />
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
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    lineHeight: 22,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
    gap: 12,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '600',
  },
  form: {
    gap: 8,
  },
  submitBtn: {
    marginTop: 20,
  },
});
