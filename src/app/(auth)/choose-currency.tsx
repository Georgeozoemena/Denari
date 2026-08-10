import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { CURRENCIES } from '@/utils/currency';

export default function ChooseCurrencyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colors = Colors.light;
  const { setUser } = useApp();

  const name = params.name as string;
  const email = params.email as string;
  const phone = params.phone as string;

  const [selected, setSelected] = useState('NGN');

  const handleContinue = () => {
    // Create user profile with onboarding incomplete (will complete on success screen)
    setUser({
      id: Date.now().toString(),
      name: name || 'User',
      email: email || '',
      phone: phone || '',
      currency: selected,
      hasCompletedOnboarding: false,
      createdAt: new Date().toISOString(),
    });
    
    router.push('/(auth)/success');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Choose Currency</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Select your preferred currency to get started.
        </Text>
      </View>

      <View style={styles.list}>
        {CURRENCIES.map((item) => {
          const isSelected = selected === item.code;
          return (
            <Pressable
              key={item.code}
              style={[
                styles.itemCard,
                {
                  backgroundColor: colors.backgroundElevated,
                  borderColor: isSelected ? colors.primary : colors.border,
                },
              ]}
              onPress={() => setSelected(item.code)}>
              <View style={styles.itemLeft}>
                <Text style={styles.flag}>{item.flag}</Text>
                <View>
                  <Text style={[styles.currencyName, { color: colors.text }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.currencyCode, { color: colors.textSecondary }]}>
                    {item.code} ({item.symbol})
                  </Text>
                </View>
              </View>
              {isSelected && (
                <View style={[styles.checkmark, { backgroundColor: colors.primary }]}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      <Button
        title="Continue"
        onPress={handleContinue}
        style={styles.submitBtn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    lineHeight: 24,
  },
  list: {
    flex: 1,
    gap: 16,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1.5,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  flag: {
    fontSize: 28,
  },
  currencyName: {
    fontSize: 16,
    fontWeight: '600',
  },
  currencyCode: {
    fontSize: 14,
    marginTop: 2,
  },
  checkmark: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  submitBtn: {
    marginBottom: 20,
  },
});
