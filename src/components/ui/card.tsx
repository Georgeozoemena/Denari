import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';

import { Colors, Elevation, Radius, Spacing } from '@/constants/theme';

interface CardProps extends PropsWithChildren {
  variant?: 'default' | 'soft' | 'outlined';
  onPress?: () => void;
  style?: ViewStyle;
}

export function Card({ children, variant = 'default', onPress, style }: CardProps) {
  const colors = Colors.light;

  const getVariantStyles = () => {
    switch (variant) {
      case 'default':
        return {
          backgroundColor: colors.background,
          ...Elevation.card,
        };
      case 'soft':
        return {
          backgroundColor: colors.backgroundSubtle,
          ...Elevation.soft,
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.border,
          ...Elevation.none,
        };
    }
  };

  const Component = onPress ? Pressable : View;

  return (
    <Component
      onPress={onPress}
      style={({ pressed }: any) => [
        styles.card,
        getVariantStyles(),
        onPress && pressed && styles.pressed,
        style,
      ]}>
      {children}
    </Component>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.md,
    padding: Spacing.lg,
  },
  pressed: {
    opacity: 0.9,
  },
});
