# DENARI Design System v2.0
**Strategic Redesign — Mobile Finance App**

---

## 🎯 Design Principles

1. **Hierarchy First** — Every screen has one clear primary action
2. **Purposeful Spacing** — 8pt grid, generous but not wasteful
3. **Restraint** — No decorative elements that don't serve the user
4. **Perceived Performance** — Fast, responsive, predictable
5. **Progressive Disclosure** — Show what matters now, hide the rest

**Inspiration sources** (principles only): Kuda, Revolut, Monzo, Linear, Stripe Dashboard
**What we keep**: Our orange brand, our identity, our voice

---

## 🎨 Color System

### Philosophy
- **White is the default** — Clean, spacious, uncluttered
- **Orange is the accent** — Use sparingly for CTAs and key moments
- **Semantic colors tell stories** — Green = income, Red = expense

### Palette

```typescript
// Brand (DENARI Orange)
primary: '#FD7E15'        // Primary CTAs only
primaryHover: '#E66D00'   // Press/hover states
primarySoft: '#FFF0E6'    // Soft backgrounds

// Backgrounds (White-based)
background: '#FFFFFF'           // Main app background
backgroundSubtle: '#F8F9FA'     // Alternate sections
backgroundElevated: '#FFFFFF'   // Cards, modals

// Text Hierarchy
text: '#1A1A1A'           // Headlines, primary
textSecondary: '#6B7280'  // Body, descriptions
textTertiary: '#9CA3AF'   // Hints, placeholders

// Semantic
income: '#10B981'         // Green for money in
expense: '#EF4444'        // Red for money out
```

### Usage Rules
✅ **DO**
- Use white backgrounds by default
- Use orange ONLY for primary CTAs
- Use semantic colors for income/expense

❌ **DON'T**
- Overuse orange (not for icons, backgrounds, etc.)
- Use random colors not in the palette
- Create colored backgrounds without purpose

---

## 📝 Typography

### 6-Level Hierarchy (Simplified)

```typescript
Display  → 32px / 800 / -0.5  // Hero moments, welcome screens
Heading  → 24px / 700 / -0.3  // Page titles
Title    → 20px / 600         // Section headers
Body     → 16px / 400         // Main content
Caption  → 14px / 400         // Metadata
Small    → 12px / 500         // Timestamps, hints
```

### Weight Scale
```typescript
regular: 400    // Body text
medium: 500     // Small text, captions
semibold: 600   // Titles, labels
bold: 700       // Headings, emphasis
extrabold: 800  // Display, hero
```

### Usage Examples

```typescript
// Page title
<Text style={[Typography.heading, { fontWeight: FontWeight.bold }]}>
  Transactions
</Text>

// Transaction amount (emphasis)
<Text style={[Typography.body, { fontWeight: FontWeight.semibold }]}>
  ₦25,000
</Text>

// Timestamp
<Text style={[Typography.small, { color: colors.textTertiary }]}>
  Today, 2:30 PM
</Text>
```

---

## 📏 Spacing (8pt Grid)

### Scale
```
xs:   4px  — Minimal (badge padding)
sm:   8px  — Icon to text gap
md:   12px — List item spacing
lg:   16px — Card padding
xl:   20px — Section padding
xxl:  24px — Between sections
xxxl: 32px — Major sections
huge: 40px — Hero sections
massive: 48px — Landing pages
```

### Vertical Rhythm
```typescript
// Section structure
<View style={{ paddingHorizontal: Spacing.xl }}>  // 20px
  <View style={{ marginBottom: Spacing.xxl }}>     // 24px
    // Content
  </View>
</View>
```

### DO's and DON'Ts
✅ Use the scale consistently (no arbitrary values)
✅ Give elements breathing room
✅ Stack related items closer (md), unrelated farther (xxl)

❌ Don't use random spacing (e.g., 15px, 18px)
❌ Don't crowd the UI to fit more in

---

## 🔲 Border Radius (4-Level)

```
sm:   8px  — Tags, badges, inputs
md:   12px — Cards, buttons
lg:   20px — Hero cards, bottom sheets
xl:   28px — Special moments (success screens)
full: 9999 — Pills, avatars
```

### Usage
```typescript
// Standard card
borderRadius: Radius.md  // 12px

// Primary button
borderRadius: Radius.md  // 12px (same as card for consistency)

// Avatar
borderRadius: Radius.full  // Perfect circle
```

---

## ✨ Elevation (Subtle Shadows)

### Philosophy
Cards should feel **soft**, not **floating**. Shadows are barely visible.

```typescript
none   → No shadow
soft   → 0.03 opacity (barely there)
card   → 0.04 opacity (standard cards)
raised → 0.06 opacity (pressed states)
modal  → 0.08 opacity (dialogs, sheets)
```

### Usage
```typescript
// Most cards use "soft"
style={[styles.card, Elevation.soft]}

// Interactive cards use "card"
style={[styles.actionCard, Elevation.card]}

// Modal/sheet uses "modal"
style={[styles.bottomSheet, Elevation.modal]}
```

---

## 🎯 Component Sizes

### Touch Targets
```typescript
touchTarget: 44  // Minimum iOS/Android target (44x44)
```

### Buttons
```typescript
buttonSm: 36  // Compact actions
buttonMd: 48  // Standard buttons (most common)
buttonLg: 56  // Primary CTAs
```

### Inputs
```typescript
inputMd: 48  // Standard input height
```

### Avatars
```typescript
avatarSm: 32  // Inline
avatarMd: 40  // List items
avatarLg: 48  // Headers
avatarXl: 64  // Profile
```

---

## ⚡ Animation (Subtle, Fast)

### Duration
```typescript
fast: 150ms     // Press feedback, toggles
base: 200ms     // Standard transitions
slow: 300ms     // Entrances, modals
slower: 400ms   // Complex animations
```

### Easing
```typescript
easeOut:   [0.16, 1, 0.3, 1]    // Snappy (buttons)
easeInOut: [0.4, 0, 0.2, 1]     // Smooth (sheets)
spring:    { damping: 20, stiffness: 300 }  // Bouncy
```

### Rules
✅ Use animations for feedback (press, toggle)
✅ Keep them fast (<200ms for UI feedback)
✅ Use spring for natural feel

❌ No flashy, distracting animations
❌ No gratuitous motion
❌ No slow animations (feels sluggish)

---

## 📐 Layout Constants

```typescript
screenPadding: 20          // Horizontal padding (most screens)
screenPaddingLarge: 24     // Hero sections
headerHeight: 56
tabBarHeight: 88 (iOS) / 72 (Android)
maxContentWidth: 600       // Constrain wide screens
```

---

## 🎨 Usage Examples

### Example 1: Transaction Card
```typescript
<Pressable style={[
  styles.transaction,
  Elevation.soft,
]}>
  <View style={styles.transactionLeft}>
    <View style={[
      styles.icon,
      { backgroundColor: colors.incomeSoft }
    ]}>
      <Ionicons name="arrow-down" size={IconSize.md} color={colors.income} />
    </View>
    <View>
      <Text style={[Typography.body, { fontWeight: FontWeight.semibold }]}>
        Salary Payment
      </Text>
      <Text style={[Typography.small, { color: colors.textTertiary }]}>
        Today, 9:00 AM
      </Text>
    </View>
  </View>
  <Text style={[Typography.body, { fontWeight: FontWeight.bold, color: colors.income }]}>
    +₦450,000
  </Text>
</Pressable>

const styles = StyleSheet.create({
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: colors.background,
    borderRadius: Radius.md,
    marginBottom: Spacing.md,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  icon: {
    width: ComponentSize.touchTarget,
    height: ComponentSize.touchTarget,
    borderRadius: Radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

### Example 2: Primary CTA Button
```typescript
<Pressable
  style={({ pressed }) => [
    styles.primaryButton,
    { backgroundColor: colors.primary },
    pressed && Elevation.raised,
  ]}
  onPress={handleSubmit}>
  <Text style={[Typography.body, { fontWeight: FontWeight.semibold, color: '#FFFFFF' }]}>
    Add Transaction
  </Text>
</Pressable>

const styles = StyleSheet.create({
  primaryButton: {
    height: ComponentSize.buttonMd,
    paddingHorizontal: Spacing.xxxl,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...Elevation.card,
  },
});
```

### Example 3: Section Header
```typescript
<View style={styles.sectionHeader}>
  <Text style={[Typography.title, { fontWeight: FontWeight.semibold }]}>
    Recent Activity
  </Text>
  <Pressable onPress={onSeeAll}>
    <Text style={[Typography.caption, { fontWeight: FontWeight.semibold, color: colors.primary }]}>
      See All
    </Text>
  </Pressable>
</View>

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
});
```

---

## ✅ Design Checklist (Per Screen)

### Before coding:
- [ ] Identified the ONE primary action
- [ ] Identified secondary actions
- [ ] Determined what can be hidden/moved

### During coding:
- [ ] Using design tokens (no arbitrary values)
- [ ] Spacing follows 8pt grid
- [ ] Text uses Typography scale
- [ ] Colors from palette only
- [ ] Shadows are subtle (soft/card)

### After coding:
- [ ] Business logic unchanged
- [ ] No new console warnings
- [ ] Works on iOS and Android
- [ ] Safe area handled
- [ ] Diff is clean and readable

---

## 🚫 Anti-Patterns (Don't Do This)

### ❌ Arbitrary values
```typescript
marginTop: 17  // NO! Use Spacing scale
fontSize: 15   // NO! Use Typography scale
borderRadius: 14  // NO! Use Radius scale
```

### ❌ Inline styles everywhere
```typescript
<View style={{ padding: 20, backgroundColor: '#FFF', ... }}>  // NO!
```
Should be:
```typescript
<View style={[styles.card, { backgroundColor: colors.background }]}>  // YES!
```

### ❌ Overusing orange
```typescript
<Ionicons name="wallet" size={24} color={colors.primary} />  // NO!
```
Should be:
```typescript
<Ionicons name="wallet" size={IconSize.lg} color={colors.text} />  // YES!
```

### ❌ Heavy shadows
```typescript
shadowOpacity: 0.3  // NO! Looks cheap
```
Should be:
```typescript
...Elevation.card  // YES! Subtle
```

---

## 🎯 Next: Phase 2 — Component Library

Now that the design system is defined, we'll build:
1. Button (variants, sizes, states)
2. Card (default, outlined, soft)
3. Input (with validation states)
4. Badge (status, count)

**Showing 3-4 components first, then continuing after approval.**

---

**DESIGN SYSTEM COMPLETE** ✅
Ready to proceed to Phase 2 with your approval.
