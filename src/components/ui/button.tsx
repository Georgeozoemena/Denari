import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

import { 
  Animation, 
  Colors, 
  ComponentSize, 
  Elevation, 
  FontWeight, 
  Radius, 
  Spacing, 
  Typography 
} from '@/constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  style,
}: ButtonProps) {
  const colors = Colors.light;

  const heightMap = {
    small: ComponentSize.buttonSm,
    medium: ComponentSize.buttonMd,
    large: ComponentSize.buttonLg,
  };

  const paddingMap = {
    small: Spacing.lg,
    medium: Spacing.xl,
    large: Spacing.xxl,
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: colors.primary, borderWidth: 0 };
      case 'secondary':
        return { backgroundColor: colors.primarySoft, borderWidth: 0 };
      case 'outline':
        return { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.border };
      case 'ghost':
        return { backgroundColor: 'transparent', borderWidth: 0 };
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.textTertiary;
    switch (variant) {
      case 'primary': return '#FFFFFF';
      case 'secondary': return colors.primary;
      case 'outline':
      case 'ghost': return colors.text;
    }
  };

  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        {
          height: heightMap[size],
          paddingHorizontal: paddingMap[size],
          ...getVariantStyles(),
          ...(variant === 'primary' && !disabled ? Elevation.card : {}),
        },
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#FFFFFF' : colors.primary}
        />
      ) : (
        <>
          {icon}
          <Text
            style={[
              Typography.body,
              {
                fontWeight: FontWeight.semibold,
                color: getTextColor(),
              },
              icon && styles.textWithIcon,
            ]}>
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
    gap: Spacing.sm,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
  },
  textWithIcon: {
    marginLeft: Spacing.xs,
  },
});
