import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';

interface SocialButtonProps {
  onPress: () => void;
  provider: 'google' | 'apple';
  style?: any;
}

export function SocialButton({ onPress, provider, style }: SocialButtonProps) {
  const colors = Colors.light;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
        },
        pressed && styles.pressed,
        style,
      ]}>
      <View style={styles.iconPlaceholder}>
        <Text style={styles.iconText}>{provider === 'google' ? 'G' : ''}</Text>
      </View>
      <Text style={[styles.text, { color: colors.text }]}>
        {provider === 'google' ? 'Google' : 'Apple'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 8,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 14,
    fontWeight: '700',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
