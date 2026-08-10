# Budget UI Visual Guide

## Budgets Screen Layout

```
┌─────────────────────────────────────────────┐
│  Budgets                              [+]   │  ← Header
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────┐  ┌──────────────┐       │  ← Horizontal
│  │  Jan 2026    │  │  Dec 2025    │   ➜   │     Scrollable
│  │  [Current]   │  │              │       │     Budget Cards
│  │              │  │              │       │     (Orange = Current)
│  │  Spent: ₦45K │  │  Spent: ₦38K │       │     (White = Past/Future)
│  │  Budget: ₦50K│  │  Budget: ₦50K│       │
│  │  ▓▓▓▓▓░░░░░  │  │  ▓▓▓▓░░░░░░  │       │
│  │    90% used  │  │    76% used  │       │
│  └──────────────┘  └──────────────┘       │
│                                             │
│  Showing 6 of 12 budgets      Load more >  │  ← Pagination
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐  │  ← Selected Budget
│  │  January 2026                  [✏️]  │  │     Details Panel
│  │                                      │  │     (Scrollable)
│  │  Allocated  │  Spent     │ Remaining│  │
│  │  ₦50,000    │  ₦45,000   │ ₦5,000   │  │
│  │                                      │  │
│  │  Overall Progress            90%    │  │
│  │  ▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░       │  │
│  │                                      │  │
│  │  [↑] Monthly Income   ₦100,000     │  │
│  └─────────────────────────────────────┘  │
│                                             │
│  Category Budgets                          │
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │ [🍕] Food & Dining     +₦2,000     │  │
│  │      ₦13,000 of ₦15,000            │  │
│  │      ▓▓▓▓▓▓▓▓▓▓░░░░░░  87%        │  │
│  └─────────────────────────────────────┘  │
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │ [🚗] Transportation    +₦5,000     │  │
│  │      ₦7,000 of ₦12,000             │  │
│  │      ▓▓▓▓▓▓░░░░░░░░░░  58%        │  │
│  └─────────────────────────────────────┘  │
│                                             │
│  ... more categories ...                   │
│                                             │
└─────────────────────────────────────────────┘
```

## Create Budget Screen

```
┌─────────────────────────────────────────────┐
│  [<]    Create Budget                       │  ← Header
├─────────────────────────────────────────────┤
│                                             │
│  ●────●────○                                │  ← Step Indicator
│  1    2    3                                │     (1=Month/Income
│                                             │      2=Categories
│                                             │      3=Review)
├─────────────────────────────────────────────┤
│                                             │
│  Budget Setup                               │
│  Select the month and enter your monthly    │
│  income                                     │
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │  Budget Month                        │  │
│  │                                      │  │
│  │  [📅]  January 2026          [▼]   │  │  ← Month Selector
│  │                                      │  │     (Opens Modal)
│  │  ℹ️ A budget already exists for     │  │
│  │     this month. Saving will update  │  │
│  │     it.                              │  │
│  └─────────────────────────────────────┘  │
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │  Monthly Income                      │  │
│  │                                      │  │
│  │  ₦ 100,000                          │  │  ← Income Input
│  │                                      │  │
│  └─────────────────────────────────────┘  │
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │ 💡 Include all sources: salary,     │  │  ← Tip Card
│  │    freelance, investments, etc.      │  │
│  └─────────────────────────────────────┘  │
│                                             │
├─────────────────────────────────────────────┤
│  [        Continue        ]                 │  ← Footer Button
└─────────────────────────────────────────────┘
```

## Month Picker Modal

```
┌─────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  ← Dark Backdrop
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │     (Dismisses on tap)
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░┌─────────────────────────────┐░░░ │
│ ░░░░░░░│ Select Budget Month     [✕] │░░░ │  ← Modal Header
│ ░░░░░░░├─────────────────────────────┤░░░ │
│ ░░░░░░░│                             │░░░ │
│ ░░░░░░░│  January 2026        [✓]   │░░░ │  ← Selected (Orange)
│ ░░░░░░░├─────────────────────────────┤░░░ │
│ ░░░░░░░│  February 2026  [Exists]   │░░░ │  ← Has Budget
│ ░░░░░░░├─────────────────────────────┤░░░ │
│ ░░░░░░░│  March 2026                │░░░ │
│ ░░░░░░░├─────────────────────────────┤░░░ │
│ ░░░░░░░│  April 2026                │░░░ │
│ ░░░░░░░├─────────────────────────────┤░░░ │
│ ░░░░░░░│  ... more months ...       │░░░ │
│ ░░░░░░░│                             │░░░ │
│ ░░░░░░░└─────────────────────────────┘░░░ │
└─────────────────────────────────────────────┘
```

## Budget Card States

### Current Month (Orange)
```
┌──────────────────┐
│  Jan 2026        │  ← White text
│  [Current]       │  ← Badge (rgba white)
│                  │
│  Spent  ₦45,000 │  ← White text
│  Budget ₦50,000 │
│                  │
│  ▓▓▓▓▓▓▓▓░░░░   │  ← White progress bar
│                  │
│    90% used      │  ← White text
└──────────────────┘
```

### Past/Future Month (White)
```
┌──────────────────┐
│  Dec 2025        │  ← Dark text
│                  │
│                  │
│  Spent  ₦38,000 │  ← Dark text
│  Budget ₦50,000 │
│                  │
│  ▓▓▓▓▓░░░░░░░   │  ← Colored progress bar
│                  │  (Green/Orange/Red)
│    76% used      │  ← Gray text
└──────────────────┘
```

### Selected Budget (Border)
```
╔══════════════════╗  ← Orange border (2px)
║  Jan 2026        ║
║  [Current]       ║
║                  ║
║  Spent  ₦45,000 ║
║  Budget ₦50,000 ║
║                  ║
║  ▓▓▓▓▓▓▓▓░░░░   ║
║                  ║
║    90% used      ║
╚══════════════════╝
```

## Past Budget Notice

```
┌─────────────────────────────────────────┐
│  December 2025                          │  ← No edit button
│                                         │     for past months
│  ... budget details ...                 │
│                                         │
│  ... category cards ...                 │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ 🔒 This is a past budget and      │ │  ← Lock notice
│  │    cannot be edited                │ │     (Orange bg)
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## Progress Bar Colors

```
Under 80%:  ▓▓▓▓░░░░░░  (Green #34C759)
80-99%:     ▓▓▓▓▓▓▓▓░░  (Orange #FF9500)
100%+:      ▓▓▓▓▓▓▓▓▓▓  (Red #FF3B30)
```

## Interaction Flow

```
User Journey: Viewing Budgets

1. Open Budgets Tab
   └─> Shows horizontal cards (current month selected)
   
2. Swipe Left/Right
   └─> Browse through budgets
   └─> Smooth snap scrolling
   
3. Tap Any Card
   └─> Becomes selected (orange border)
   └─> Details panel updates below
   
4. Scroll Details
   └─> See overview, categories, progress
   
5. Load More (if needed)
   └─> Tap "Load more" button
   └─> Loads 6 more budgets
   
6. Edit Budget (current/future only)
   └─> Tap edit icon (pencil)
   └─> Opens create-budget flow
   └─> Pre-filled with existing data
```

```
User Journey: Creating Budget

1. Tap "+" Button
   └─> Opens create-budget screen
   
2. Select Month
   └─> Tap month selector
   └─> Modal opens with 12 months
   └─> Select desired month
   └─> Form updates if budget exists
   
3. Enter Income
   └─> Type monthly income amount
   └─> Tap "Continue"
   
4. Add Categories
   └─> Select category from chips
   └─> Enter amount
   └─> Tap "Add"
   └─> Repeat for more categories
   └─> See running total
   └─> Tap "Review"
   
5. Review & Save
   └─> Check breakdown
   └─> See warnings (if any)
   └─> Tap "Save Budget"
   └─> Success message
   └─> Return to budgets screen
```

## Responsive Design

### Card Width Calculation
```typescript
const CARD_WIDTH = Dimensions.get('window').width * 0.85;
// iPhone 12: 390 * 0.85 = 331.5px
// iPhone 14 Pro Max: 430 * 0.85 = 365.5px
// iPad: 768 * 0.85 = 652.8px
```

### Spacing System
```
32px - Between major sections (Recent Activity, Budget, Goals)
20px - Horizontal padding for lists/screens
16px - Card padding, gap between related items
12px - Gap between sub-items (within cards)
8px  - Card margins (horizontal FlatList)
```

## Accessibility Features

- ✅ All touch targets > 44x44pt
- ✅ High contrast text (WCAG AA compliant)
- ✅ Clear visual indicators (borders, colors, badges)
- ✅ Meaningful labels for screen readers
- ✅ Large, readable fonts (minimum 13px)
- ✅ Color not the only indicator (badges + text)

## Animation & Transitions

- Snap scrolling: `decelerationRate="fast"`
- Card selection: Instant border appearance
- Modal: Slide up from bottom (React Native default)
- List updates: Smooth FlatList re-rendering
- Progress bars: Width animated via percentage

## Performance Optimizations

1. **FlatList Virtualization**: Only renders visible cards
2. **Pagination**: Loads 6 budgets at a time (not all at once)
3. **useCallback**: Memoizes handleLoadMore function
4. **Shallow Rendering**: Details panel only shows selected budget
5. **State Efficiency**: Minimal re-renders on selection change

## Color Palette Reference

```
Primary Colors:
  Orange:  #FF7E15  (Primary brand, current month)
  Green:   #34C759  (Success, under budget)
  Orange:  #FF9500  (Warning, 80-99%)
  Red:     #FF3B30  (Danger, over budget)

Text Colors:
  Primary:   #000000
  Secondary: #8E8E93
  Tertiary:  #C7C7CC

Background Colors:
  Base:      #F9FAFB
  Elevated:  #FFFFFF
  Border:    #E5E5E5

Tinted Backgrounds:
  Success:   #E8F5E9  (Green tint)
  Warning:   #FFF4E6  (Orange tint)
  Danger:    #FFE8E6  (Red tint)
```

This visual guide should help understand the layout, interaction flow, and design decisions! 🎨
