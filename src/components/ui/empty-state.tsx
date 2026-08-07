import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Button } from './button';
import { Colors, FontWeight, IconSize, Spacing, Typography } from '@/constants/theme';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export function EmptyState({
  icon = 'file-tray-outline',
  title,
  description,
  actionLabel,
  onAction,
  style,
}: EmptyStateProps) {
  const colors = Colors.light;

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.iconContainer, { backgroundColor: colors.backgroundSubtle }]}>
        <Ionicons name={icon} size={IconSize.xl} color={colors.textTertiary} />
      </View>
      
      <Text
        style={[
          Typography.title,
          { fontWeight: FontWeight.semibold, color: colors.text, textAlign: 'center' },
        ]}>
        {title}
      </Text>
      
      {description && (
        <Text
          style={[
            Typography.body,
            { color: colors.textSecondary, textAlign: 'center', marginTop: Spacing.sm },
          ]}>
          {description}
        </Text>
      )}
      
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          variant="primary"
          style={{ marginTop: Spacing.xl }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.massive,
    paddingHorizontal: Spacing.xxl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
});
