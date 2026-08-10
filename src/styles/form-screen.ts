import { StyleSheet } from 'react-native';

import { Colors, Elevation, FontWeight, IconSize, Layout, Radius, Spacing, Typography } from '@/constants/theme';

export const cardBorder = { borderWidth: 1, borderColor: Colors.light.border };

export const formScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.backgroundSubtle,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.screenPadding,
    paddingTop: 60,
    paddingBottom: Spacing.lg,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.backgroundElevated,
    borderWidth: 1,
    borderColor: Colors.light.border,
    ...Elevation.soft,
  },
  title: {
    ...Typography.title,
    fontSize: 18,
  },
  placeholder: {
    width: 44,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Layout.screenPadding,
    paddingBottom: Spacing.xl,
    gap: Spacing.lg,
  },
  field: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    backgroundColor: Colors.light.backgroundElevated,
    borderWidth: 1,
    borderColor: Colors.light.border,
    ...Elevation.soft,
  },
  fieldLabel: {
    ...Typography.small,
    fontWeight: FontWeight.medium,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.md,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currency: {
    fontSize: 28,
    fontWeight: FontWeight.bold,
    marginRight: Spacing.sm,
  },
  amountInput: {
    fontSize: 28,
    fontWeight: FontWeight.bold,
    flex: 1,
    padding: 0,
  },
  picker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircleSmall: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerText: {
    ...Typography.body,
    fontWeight: FontWeight.medium,
  },
  dateInput: {
    ...Typography.body,
    fontWeight: FontWeight.medium,
    flex: 1,
    padding: 0,
  },
  notesInput: {
    ...Typography.body,
    padding: 0,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  dropdown: {
    marginTop: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.light.borderLight,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  dropdownText: {
    ...Typography.body,
    fontWeight: FontWeight.medium,
  },
  footer: {
    padding: Layout.screenPadding,
    paddingBottom: Spacing.xxxl,
    backgroundColor: Colors.light.backgroundElevated,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  saveButton: {
    width: '100%',
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  heroAmountCard: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.light.border,
    ...Elevation.card,
  },
  heroAmountTop: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  heroAmountLabel: {
    ...Typography.small,
    fontWeight: FontWeight.medium,
  },
  heroAmountBody: {
    padding: Spacing.lg,
    backgroundColor: Colors.light.backgroundElevated,
  },
});

export { IconSize, Radius, Spacing, Typography, FontWeight };
