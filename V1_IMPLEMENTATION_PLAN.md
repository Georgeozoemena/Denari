# DENARI v1.0 - Implementation Completion Plan

## ✅ COMPLETED

### 1. Improved PIN Security
- Rate limiting (5 attempts)
- 5-minute lockout
- Better hash function (djb2 with salt)
- Attempt counter display

### 2. Add Expense Integration
- Connected to AppContext
- Uses real wallets
- Auto-updates balance
- Balance checking
- Success feedback

## 🔄 IN PROGRESS

### 3. Add Income Integration
**File:** `src/app/add-income.tsx`
**Status:** Needs same update as add-expense
**Changes needed:**
```typescript
// Replace PAYMENT_METHODS with wallets from context
const { addTransaction, wallets, user } = useApp();

// Update category icons to use colors.income (#34C759)
// Add wallet picker instead of payment method
// Call addTransaction on save
// Show success message
```

## ❌ TODO - HIGH PRIORITY

### 4. Budget Management Screens

#### A. Budget List Screen
**File:** `src/app/(tabs)/budgets.tsx` (NEW)
**Features:**
- List all budgets
- Show current month budget
- Progress bars for each category
- Total spent / total allocated
- "Create Budget" button
- Empty state if no budget

#### B. Create Budget Screen
**File:** `src/app/create-budget.tsx` (NEW)
**Features:**
- Multi-step wizard:
  1. Select month
  2. Set monthly income
  3. Select categories
  4. Allocate amounts per category
  5. Review & confirm
- Validation (total <= income recommended)
- Save to context via `addBudget()`

#### C. Budget Detail Screen
**File:** `src/app/budget/[id].tsx` (NEW)
**Features:**
- Show budget progress
- Category breakdown
- Spent vs allocated
- Edit budget
- Delete budget
- Transaction list for category

### 5. Savings Goals Screens

#### A. Savings List Screen
**File:** `src/app/(tabs)/savings.tsx` (NEW)
**Features:**
- List all goals
- Progress bars
- Target amount & date
- Current amount
- "Create Goal" button
- Empty state

#### B. Create Goal Screen
**File:** `src/app/create-goal.tsx` (NEW)
**Features:**
- Goal name
- Target amount
- Target date
- Optional icon/color picker
- Save to context via `addSavingsGoal()`

#### C. Goal Detail Screen
**File:** `src/app/goal/[id].tsx` (NEW)
**Features:**
- Progress visualization
- Add contribution button
- Edit goal
- Delete goal
- History of contributions

#### D. Add Contribution Modal
**File:** `src/app/add-contribution.tsx` (NEW)
**Features:**
- Amount input
- Source wallet
- Date
- Save & update goal progress

### 6. CSV Export

#### A. Export Service
**File:** `src/services/export.ts` (NEW)
**Functions:**
```typescript
export async function exportTransactionsCSV(
  transactions: Transaction[],
  dateRange?: { start: string; end: string }
): Promise<string>

export async function exportBudgetsCSV(budgets: Budget[]): Promise<string>

export async function exportSavingsGoalsCSV(goals: SavingsGoal[]): Promise<string>

export async function shareCSV(csvContent: string, filename: string): Promise<void>
```

#### B. Export UI
**Location:** Add to Profile screen or create Export screen
**Features:**
- Date range picker
- Export type selector (Transactions / Budgets / Goals / All)
- Preview option
- Share button
- Success message

**Dependencies needed:**
```bash
npx expo install expo-sharing expo-file-system
```

### 7. Daily/Monthly Feed Toggle

#### A. Feed Toggle Component
**File:** `src/components/feed-toggle.tsx` (NEW)
**Features:**
- Segmented control: Daily | Monthly
- Switch view on dashboard
- Persist preference

#### B. Daily Summary Card
**File:** `src/components/daily-summary.tsx` (NEW)
**Features:**
- Today's income
- Today's expenses
- Net change
- Top category today
- Quick stats

#### C. Update Dashboard
**File:** `src/app/(tabs)/index.tsx`
**Changes:**
- Add feed toggle
- Conditional rendering daily vs monthly
- Filter transactions by selected period

## 📋 IMPLEMENTATION STEPS

### Phase 1: Complete Add Income (30 min)
1. Update `src/app/add-income.tsx` same as add-expense
2. Replace payment methods with wallets
3. Test income addition

### Phase 2: Budget Management (3-4 hours)
1. Create budget list tab screen
2. Create budget wizard (multi-step)
3. Create budget detail screen
4. Test budget creation and tracking
5. Verify expense auto-updates budget

### Phase 3: Savings Goals (2-3 hours)
1. Create savings list tab screen
2. Create goal creation form
3. Create goal detail screen
4. Create add contribution modal
5. Test goal progress tracking

### Phase 4: CSV Export (2 hours)
1. Install dependencies
2. Create export service
3. Generate CSV format
4. Add export UI to profile
5. Test sharing functionality

### Phase 5: Feed Toggle (1-2 hours)
1. Create toggle component
2. Create daily summary component
3. Update dashboard with toggle
4. Add period filtering
5. Test switching views

### Phase 6: Polish & Testing (2-3 hours)
1. Test all features end-to-end
2. Fix bugs
3. Add loading states
4. Improve error messages
5. Add empty states
6. Test data persistence

## 🎯 ACCEPTANCE CRITERIA

### Budget Management
- [ ] Can create monthly budget
- [ ] Can assign multiple categories
- [ ] Expenses auto-update budget
- [ ] Progress bars show correctly
- [ ] Can view budget details
- [ ] Can edit budget
- [ ] Can delete budget

### Savings Goals
- [ ] Can create savings goal
- [ ] Can add contributions
- [ ] Progress updates correctly
- [ ] Can view goal details
- [ ] Can edit goal
- [ ] Can delete goal

### CSV Export
- [ ] Can export transactions to CSV
- [ ] Can export budgets to CSV
- [ ] Can export goals to CSV
- [ ] Can select date range
- [ ] Can share CSV file
- [ ] CSV opens in Excel/Sheets

### Daily/Monthly Feed
- [ ] Toggle switches views
- [ ] Daily summary shows today's data
- [ ] Monthly summary shows month data
- [ ] Preference persists
- [ ] Calculations are correct

### Integration
- [ ] Add expense updates wallet & budget
- [ ] Add income updates wallet
- [ ] Balance = sum of all wallets
- [ ] Transactions filter by period
- [ ] All data persists after app restart

## 📦 NEW DEPENDENCIES NEEDED

```json
{
  "expo-sharing": "~12.0.0",
  "expo-file-system": "~18.0.0"
}
```

Install with:
```bash
npx expo install expo-sharing expo-file-system
```

## 🗂️ FILE STRUCTURE

```
src/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx ✅ (needs feed toggle)
│   │   ├── transactions.tsx ✅
│   │   ├── analytics.tsx ✅
│   │   ├── budgets.tsx ❌ NEW
│   │   ├── savings.tsx ❌ NEW
│   │   └── profile.tsx ✅
│   ├── (auth)/ ✅
│   ├── add-expense.tsx ✅
│   ├── add-income.tsx ⚠️ (needs update)
│   ├── create-budget.tsx ❌ NEW
│   ├── create-goal.tsx ❌ NEW
│   ├── add-contribution.tsx ❌ NEW
│   ├── budget/
│   │   └── [id].tsx ❌ NEW
│   └── goal/
│       └── [id].tsx ❌ NEW
├── components/
│   ├── ui/ ✅
│   ├── progressive-setup.tsx ✅
│   ├── feed-toggle.tsx ❌ NEW
│   └── daily-summary.tsx ❌ NEW
├── services/
│   ├── storage.ts ✅
│   ├── pin.ts ✅
│   └── export.ts ❌ NEW
└── utils/
    └── currency.ts ✅
```

## ⏱️ ESTIMATED TIME

| Task | Time | Priority |
|------|------|----------|
| Complete Add Income | 30 min | P0 |
| Budget Management UI | 4 hours | P0 |
| Savings Goals UI | 3 hours | P0 |
| CSV Export | 2 hours | P1 |
| Feed Toggle | 2 hours | P1 |
| Testing & Polish | 3 hours | P1 |
| **TOTAL** | **~14 hours** | |

## 🚀 LAUNCH CHECKLIST

Before v1.0 release:
- [ ] All core features implemented
- [ ] No critical bugs
- [ ] Data persists correctly
- [ ] PIN works on every launch
- [ ] CSV export tested
- [ ] All calculations correct
- [ ] Empty states look good
- [ ] Loading states work
- [ ] Error handling graceful
- [ ] User guide written
- [ ] Privacy policy added
- [ ] Screenshots taken
- [ ] App icon finalized
- [ ] Build tested on iOS
- [ ] Build tested on Android

## 📝 NOTES

1. **Budget Auto-Update**: Already implemented in Context. When expense is created, budget spending auto-updates.

2. **Integer Math**: For v1.0, we're using floating-point but rounding displays. V2.0 will move to integer minor units.

3. **CSV Format**: Standard format with headers, compatible with Excel and Google Sheets.

4. **Feed Toggle**: Preference saved to AsyncStorage for persistence.

5. **Performance**: With AsyncStorage, app should handle ~10,000 transactions before slowdown.

## 🔄 POST-v1.0 (v1.1+)

- Receipt image attachments
- Recurring transactions
- Transaction search
- Custom categories
- Category icons/colors
- Budget templates
- Export to PDF
- Data backup reminder
- Biometric unlock
- Widget support

---

**Current Status:** 60% Complete  
**Next Priority:** Complete Add Income → Budget Management  
**Target:** v1.0 Feature Complete
