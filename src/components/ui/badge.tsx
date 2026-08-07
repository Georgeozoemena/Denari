import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Colors, FontWeight, Radius, Spacing, Typography } from '@/constants/theme';

interface BadgeProps {
  text: string | number;
  variant?: 'primary' | 'success' | 'error' | 'warning' | 'neutral';
  size?: 'small' | 'medium';
  style?: ViewStyle;
}

export function Badge({ text, variant = 'primary', size = 'medium', style }: BadgeProps) {
  const colors = Colors.light;

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.primarySoft,
          color: colors.primary,
        };
      case 'success':
        return {
          backgroundColor: colors.incomeSoft,
          color: colors.income,
        };
      case 'error':
        return {
          backgroundColor: colors.expenseSoft,
          color: colors.expense,
        };
      case 'warning':
        return {
          backgroundColor: colors.warningSoft,
          color: colors.warning,
        };
      case 'neutral':
        return {
          backgroundColor: colors.backgroundSubtle,
          color: colors.textSecondary,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const isSmall = size === 'small';

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: variantStyles.backgroundColor },
        isSmall ? styles.badgeSmall : styles.badgeMedium,
        style,
      ]}>
      <Text
        style={[
          isSmall ? Typography.small : Typography.caption,
          {
            color: variantStyles.color,
            fontWeight: FontWeight.semibold,
          },
        ]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeSmall: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    minWidth: 20,
    height: 20,
  },
  badgeMedium: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 28,
  },
});
