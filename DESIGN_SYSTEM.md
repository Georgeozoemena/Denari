# DENARI Premium Design System

## 🎨 Overview
A clean, spacious, and premium fintech UI inspired by Kuda, Revolut, and N26. This design system prioritizes clarity, hierarchy, and a refined user experience.

## Design Principles

1. **Clean & Spacious** - More breathing room between elements
2. **Bold Typography** - Strong visual hierarchy
3. **Subtle Shadows** - Depth without distraction
4. **Smart Color Usage** - Orange as accent, not dominant
5. **Card-based Architecture** - Organized, contained information
6. **Consistent Spacing** - Based on 4px grid system

---

## 📐 Spacing System (4px base unit)

```typescript
Spacing.xs    = 4px   // Tight spacing (badges, chips)
Spacing.sm    = 8px   // Small gaps (between icon and text)
Spacing.md    = 16px  // Standard gaps (between list items)
Spacing.lg    = 24px  // Section padding
Spacing.xl    = 32px  // Between major sections
Spacing.xxl   = 48px  // Hero sections
Spacing.xxxl  = 64px  // Landing pages
```

**Usage:**
```typescript
paddingHorizontal: Spacing.lg,    // 24px
marginBottom: Spacing.xl,         // 32px
gap: Spacing.md,                  // 16px
```

---

## 🎯 Typography Scale

### Headings
- **Hero**: 32px, weight 800, line-height 40 (Landing pages, welcome screens)
- **H1**: 28px, weight 700, line-height 36 (Main page titles)
- **H2**: 24px, weight 700, line-height 32 (Section titles)
- **H3**: 20px, weight 600, line-height 28 (Sub-sections)

### Body Text
- **Body**: 16px, weight 400, line-height 24 (Main content)
- **BodyBold**: 16px, weight 600, line-height 24 (Emphasis)
- **Small**: 14px, weight 400, line-height 20 (Secondary text)
- **SmallBold**: 14px, weight 600, line-height 20 (Labels)

### Utility
- **Tiny**: 12px, weight 500, line-height 16 (Timestamps, hints)
- **Caption**: 11px, weight 500, uppercase (Tags, categories)

**Usage:**
```typescript
<Text style={[Typography.h2, { color: colors.text }]}>
  Section Title
</Text>
```

---

## 🎨 Color System

### Text Hierarchy
```typescript
colors.text            // #1A1A1A - Primary text (headings, main content)
colors.textSecondary   // #6B7280 - Secondary text (descriptions)
colors.textTertiary    // #9CA3AF - Tertiary text (placeholders, hints)
```

### Backgrounds
```typescript
colors.background         // #F8F9FA - App background
colors.backgroundElement  // #FFFFFF - Cards, inputs
colors.backgroundSelected // #FFF0E6 - Selected states
```

### Primary (Use Sparingly!)
```typescript
colors.primary       // #FD7E15 - CTAs, active states
colors.primaryEnd    // #FE6901 - Gradient end
colors.primarySoft   // #FFF0E6 - Soft backgrounds
colors.primaryDark   // #E66D00 - Hover states
```

### Semantic Colors
```typescript
colors.success     // #10B981 - Income, positive states
colors.successSoft // #D1FAE5 - Success backgrounds

colors.error       // #EF4444 - Expenses, errors
colors.errorSoft   // #FEE2E2 - Error backgrounds

colors.warning     // #F59E0B - Warnings
colors.warningSoft // #FEF3C7 - Warning backgrounds

colors.info        // #3B82F6 - Information
colors.infoSoft    // #DBEAFE - Info backgrounds
```

**Best Practices:**
- Use `primary` ONLY for CTAs and key highlights
- Use semantic colors for their intended purpose
- Prefer `backgroundElement` for cards over colored backgrounds

---

## 📦 Border Radius

```typescript
BorderRadius.none = 0    // No radius
BorderRadius.xs   = 4    // Minimal (progress bars)
BorderRadius.sm   = 8    // Small elements (tags, badges)
BorderRadius.md   = 12   // Cards, inputs, icons
BorderRadius.lg   = 16   // Buttons, major cards
BorderRadius.xl   = 20   // Hero cards
BorderRadius.xxl  = 24   // Special cards
BorderRadius.full = 9999 // Pills, avatars
```

**Usage:**
```typescript
borderRadius: BorderRadius.lg,  // 16px
```

---

## ✨ Shadow System (Subtle Elevation)

```typescript
Shadows.none  // No shadow
Shadows.sm    // Subtle (buttons, small cards)
Shadows.md    // Standard (cards)
Shadows.lg    // Elevated (hero cards, modals)
Shadows.xl    // Floating (dialogs, popovers)
```

**Usage:**
```typescript
style={[
  styles.card,
  Shadows.md,  // Adds subtle shadow
]}
```

---

## 🔲 Icon Sizes

```typescript
IconSizes.xs  = 16px  // Inline icons
IconSizes.sm  = 20px  // Button icons
IconSizes.md  = 24px  // Standard icons
IconSizes.lg  = 32px  // Large icons
IconSizes.xl  = 48px  // Hero icons
```

**Usage:**
```typescript
<Ionicons name="wallet-outline" size={IconSizes.md} color={colors.text} />
```

---

## 🎯 Component Sizes

### Buttons
```typescript
ComponentSizes.button.sm = 36px  // Compact buttons
ComponentSizes.button.md = 48px  // Standard buttons
ComponentSizes.button.lg = 56px  // Prominent CTAs
```

### Inputs
```typescript
ComponentSizes.input.sm = 40px  // Compact inputs
ComponentSizes.input.md = 48px  // Standard inputs
ComponentSizes.input.lg = 56px  // Large inputs
```

### Avatars
```typescript
ComponentSizes.avatar.xs = 32px  // Inline avatars
ComponentSizes.avatar.sm = 40px  // List avatars
ComponentSizes.avatar.md = 48px  // Standard avatars
ComponentSizes.avatar.lg = 64px  // Profile avatars
ComponentSizes.avatar.xl = 80px  // Hero avatars
```

---

## 📏 Layout Constants

```typescript
Layout.screenPadding  = 24px   // Standard screen padding
Layout.cardPadding    = 20px   // Card internal padding
Layout.sectionSpacing = 32px   // Between major sections
Layout.maxContentWidth = 800px // Max content width (web)
```

---

## 💡 Usage Examples

### Creating a Card
```typescript
<View style={[
  styles.card,
  { backgroundColor: colors.backgroundElement },
  Shadows.md,
]}>
  <Text style={[Typography.h3, { color: colors.text }]}>
    Card Title
  </Text>
  <Text style={[Typography.small, { color: colors.textSecondary }]}>
    Card description
  </Text>
</View>

const styles = StyleSheet.create({
  card: {
    padding: Layout.cardPadding,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },
});
```

### Creating an Action Button
```typescript
<Pressable style={[
  styles.actionButton,
  { backgroundColor: colors.primary },
]}>
  <Ionicons name="add" size={IconSizes.sm} color="#FFFFFF" />
  <Text style={[Typography.bodyBold, { color: '#FFFFFF' }]}>
    Add Transaction
  </Text>
</Pressable>

const styles = StyleSheet.create({
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
});
```

### Creating a List Item
```typescript
<Pressable style={[
  styles.listItem,
  { backgroundColor: colors.backgroundElement },
]}>
  <View style={[
    styles.iconContainer,
    { backgroundColor: colors.primarySoft },
  ]}>
    <Ionicons name="wallet" size={IconSizes.sm} color={colors.primary} />
  </View>
  
  <View style={styles.content}>
    <Text style={[Typography.bodyBold, { color: colors.text }]}>
      Item Title
    </Text>
    <Text style={[Typography.small, { color: colors.textSecondary }]}>
      Item description
    </Text>
  </View>
</Pressable>

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.md,
    ...Shadows.sm,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
});
```

---

## ✅ Do's and Don'ts

### ✅ DO
- Use the spacing system consistently (4, 8, 16, 24, 32...)
- Apply typography styles for consistent hierarchy
- Use semantic colors for their intended purpose
- Keep shadows subtle (sm for most cases)
- Give elements breathing room

### ❌ DON'T
- Use arbitrary spacing values (use Spacing constants)
- Mix multiple text sizes without hierarchy
- Overuse the orange primary color
- Apply heavy shadows everywhere
- Crowd elements together

---

## 🚀 Quick Migration Guide

### Old Code
```typescript
fontSize: 18,
fontWeight: '700',
marginBottom: 12,
padding: 24,
borderRadius: 16,
```

### New Code
```typescript
...Typography.h3,
marginBottom: Spacing.md,
padding: Layout.cardPadding,
borderRadius: BorderRadius.lg,
```

---

## 📱 Component Library

All components should use these design tokens:
- `Button` → Uses `BorderRadius.lg`, `ComponentSizes.button`, `Shadows.sm`
- `Input` → Uses `BorderRadius.md`, `ComponentSizes.input`
- `Card` → Uses `BorderRadius.lg`, `Layout.cardPadding`, `Shadows.md`

---

## 🎉 Result

A clean, premium, and consistent UI that:
- Feels spacious and uncluttered
- Has strong visual hierarchy
- Uses color purposefully
- Is easy to navigate
- Looks professional and modern

**The key is consistency** - use these tokens everywhere!
