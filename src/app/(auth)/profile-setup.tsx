import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Colors } from '@/constants/theme';

export default function ProfileSetupScreen() {
  const router = useRouter();
  const colors = Colors.light;

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [occupation, setOccupation] = useState('');

  return (
    <ScrollView style={[styles.scrollView, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Tell us about you</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            This helps us personalize your experience.
          </Text>
        </View>

        <View style={styles.avatarSection}>
          <Pressable style={[styles.avatarCircle, { backgroundColor: colors.primarySoft }]}>
            <Text style={[styles.avatarPlaceholderText, { color: colors.primary }]}>📸</Text>
          </Pressable>
          <Text style={[styles.avatarText, { color: colors.textSecondary }]}>Add Profile Picture</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />
          <Input
            label="Date of Birth"
            placeholder="YYYY-MM-DD"
            value={dob}
            onChangeText={setDob}
          />
          <Input
            label="Occupation"
            placeholder="What is your occupation?"
            value={occupation}
            onChangeText={setOccupation}
          />

          <Button
            title="Continue"
            onPress={() => router.push('/(auth)/success')}
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
    paddingTop: 80,
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
    gap: 10,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderText: {
    fontSize: 32,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '500',
  },
  form: {
    gap: 8,
  },
  submitBtn: {
    marginTop: 20,
  },
});
