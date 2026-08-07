import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Colors, FontWeight, IconSize, Radius, Spacing, Typography } from '@/constants/theme';

interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  leftIconBg?: string;
  leftIconColor?: string;
  rightText?: string;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  style?: ViewStyle;
}

export function ListItem({
  title,
  subtitle,
  leftIcon,
  leftIconBg,
  leftIconColor,
  rightText,
  rightIcon = 'chevron-forward',
  onPress,
  style,
}: ListItemProps) {
  const colors = Colors.light;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: colors.background },
        pressed && onPress && styles.pressed,
        style,
      ]}>
      {/* Left Side */}
      {leftIcon && (
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: leftIconBg || colors.primarySoft },
          ]}>
          <Ionicons
            name={leftIcon}
            size={IconSize.md}
            color={leftIconColor || colors.primary}
          />
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        <Text
          style={[
            Typography.body,
            { fontWeight: FontWeight.semibold, color: colors.text },
          ]}>
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[
              Typography.caption,
              { color: colors.textSecondary, marginTop: 2 },
            ]}>
            {subtitle}
          </Text>
        )}
      </View>

      {/* Right Side */}
      <View style={styles.rightSide}>
        {rightText && (
          <Text
            style={[
              Typography.body,
              { fontWeight: FontWeight.semibold, color: colors.text },
            ]}>
            {rightText}
          </Text>
        )}
        {onPress && rightIcon && (
          <Ionicons
            name={rightIcon}
            size={IconSize.md}
            color={colors.textTertiary}
            style={{ marginLeft: Spacing.xs }}
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: Radius.md,
    gap: Spacing.md,
  },
  pressed: {
    opacity: 0.7,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
