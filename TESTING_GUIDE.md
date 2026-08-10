# DENARI App Testing Guide

## Complete Testing Workflow

As an app tester, follow this comprehensive testing sequence to verify all features and bug fixes.

---

## 🚀 Initial Setup Test

### 1. First Launch
- [ ] App shows splash screen with Denari logo
- [ ] Auto-navigates to welcome screen after 3 seconds
- [ ] Welcome screen shows "Get Started" button

### 2. Sign Up Flow
- [ ] Enter valid email
- [ ] Enter password (minimum 8 characters)
- [ ] Confirm password matches
- [ ] Navigate to OTP verification screen
- [ ] Enter 6-digit OTP (any code works - local app)
- [ ] Navigate to PIN setup

### 3. PIN Setup
- [ ] Enter 4-digit PIN
- [ ] Re-enter same PIN to confirm
- [ ] Success message shows
- [ ] Navigate to currency selection

### 4. Currency Selection
- [ ] Select currency (NGN, USD, EUR, GBP)
- [ ] Currency saves and appears throughout app
- [ ] Navigate to profile setup

### 5. Profile Setup
- [ ] Enter full name
- [ ] Optional: Upload profile picture
- [ ] Complete setup
- [ ] Navigate to dashboard

---

## 💰 Wallet & Balance Testing

### 1. Add First Wallet
**Path**: Dashboard → Profile → Linked Accounts → Add Account

- [ ] Tap profile icon (top right)
- [ ] Scroll to "Financial" section
- [ ] Tap "Linked Accounts"
- [ ] Add bank account or cash wallet
- [ ] Enter name: "Main Wallet"
- [ ] Enter balance: 50000
- [ ] Save wallet

### 2. Verify Total Balance
**Path**: Go back to Dashboard

- [ ] Total Balance card now shows: ₦50,000 (or your currency)
- [ ] Balance is NOT 0
- [ ] Monthly income shows: +₦0
- [ ] Monthly expenses shows: -₦0

### 3. Add Second Wallet
- [ ] Repeat adding another wallet
- [ ] Name: "Savings"
- [ ] Balance: 25000
- [ ] Go to dashboard
- [ ] **VERIFY**: Total Balance = ₦75,000 (sum of both wallets)

**✅ This confirms total balance calculation works!**

---

## 📊 Budget Status Testing

### 1. Create Budget
**Path**: Dashboard → Quick Actions → Budget → Create Budget

#### Step 1: Monthly Income
- [ ] Enter: 100000
- [ ] Tap "Continue"

#### Step 2: Budget Categories
- [ ] Select category: "Food & Dining"
- [ ] Enter amount: 30000
- [ ] Tap "Add"
- [ ] **VERIFY**: Category added to list below
- [ ] **VERIFY**: Summary shows:
  - Monthly Income: ₦100,000
  - Allocated: ₦30,000
  - Remaining: ₦70,000

- [ ] Add another: "Transport" - 15000
- [ ] Add another: "Shopping" - 20000
- [ ] **VERIFY**: Summary updates in real-time
- [ ] **VERIFY**: Allocated: ₦65,000, Remaining: ₦35,000
- [ ] Tap "Review"

#### Step 3: Review
- [ ] Verify all categories listed
- [ ] Verify percentages calculated correctly
- [ ] Tap "Save Budget"
- [ ] **VERIFY**: Success alert shows
- [ ] Tap "OK"
- [ ] **VERIFY**: Navigates to Budgets tab (NOT back button error!)

### 2. Verify Budget on Dashboard
**Path**: Navigate to Dashboard (Home tab)

- [ ] **VERIFY**: "Budget Status" section appears
- [ ] Shows: "Monthly Budget ₦100,000"
- [ ] Shows top 3 categories with progress bars
- [ ] Progress bars are EMPTY (no spending yet)
- [ ] Food & Dining: ₦0 / ₦30,000
- [ ] Transport: ₦0 / ₦15,000
- [ ] Shopping: ₦0 / ₦20,000

**✅ Budget status is now on dashboard!**

### 3. Test Budget Auto-Update
**Path**: Dashboard → Quick Actions → Send (Add Expense)

- [ ] Amount: 5000
- [ ] Category: Select "Food & Dining"
- [ ] Wallet: Select "Main Wallet"
- [ ] Date: Today
- [ ] Notes: "Groceries"
- [ ] Tap "Save Expense"
- [ ] **VERIFY**: Success alert
- [ ] Go back to Dashboard
- [ ] **VERIFY**: Budget Status section shows:
  - Food & Dining: **₦5,000 / ₦30,000**
  - Progress bar **filled ~16%** (5000/30000)
  - Bar color: **Primary blue** (under 80%)

**✅ Budget auto-updates with expenses!**

### 4. Test Over-Budget Warning
- [ ] Add another expense: Food & Dining, ₦20,000
- [ ] Go to Dashboard
- [ ] **VERIFY**: Food & Dining: ₦25,000 / ₦30,000
- [ ] **VERIFY**: Progress bar **filled ~83%**
- [ ] **VERIFY**: Bar color changes to **ORANGE** (over 80%)

- [ ] Add another: Food & Dining, ₦10,000
- [ ] Go to Dashboard
- [ ] **VERIFY**: Food & Dining: ₦35,000 / ₦30,000
- [ ] **VERIFY**: Progress bar **filled 100%**
- [ ] **VERIFY**: Bar color changes to **RED** (over budget!)
- [ ] **VERIFY**: Amount text shows in RED

**✅ Budget color indicators work!**

---

## 🎯 Savings Goals Testing

### 1. Create First Goal
**Path**: Dashboard → Quick Actions → Goals → Create Goal (+ button)

- [ ] Choose icon: Select "Car"
- [ ] Goal name: "New Car"
- [ ] Target amount: 500000
- [ ] Deadline: 2027-12-31
- [ ] Tap "Create Goal"
- [ ] **VERIFY**: Success alert shows
- [ ] Tap "OK"
- [ ] **VERIFY**: Navigates to Savings tab (NO "GO_BACK" error!)

### 2. Create More Goals
- [ ] Tap "+" button
- [ ] Icon: "Home", Name: "Dream House", Target: 2000000, Deadline: 2028-12-31
- [ ] Save goal
- [ ] Create third: Icon: "Airplane", Name: "Vacation", Target: 100000, Deadline: 2027-06-30

### 3. Verify Goals on Dashboard
**Path**: Navigate to Dashboard (Home tab)

- [ ] **VERIFY**: "Savings Goals" section appears
- [ ] Shows up to 3 goals in horizontal cards
- [ ] Each card shows:
  - Icon with color
  - Goal name
  - Progress bar (should be 0% empty)
  - "0% • ₦500,000 left" (for New Car)
- [ ] **VERIFY**: All 3 goals visible

**✅ Goals overview is on dashboard!**

### 4. Test Goal Progress (Manual Update)
**Path**: Dashboard → Savings Goals section → Tap any goal card → Opens Savings tab

- [ ] Find "New Car" goal
- [ ] Tap on it (if tappable) or find edit button
- [ ] Update current amount to: 50000
- [ ] Save changes
- [ ] Go back to Dashboard
- [ ] **VERIFY**: New Car card shows:
  - Progress bar **filled 10%** (50000/500000)
  - "10% • ₦450,000 left"

**✅ Goals display progress correctly!**

---

## 💸 Transaction & Balance Sync Testing

### 1. Add Income
**Path**: Dashboard → Quick Actions → Receive

- [ ] Amount: 50000
- [ ] Category: Select "Salary"
- [ ] Wallet: Select "Main Wallet"
- [ ] Date: Today
- [ ] Tap "Save Income"
- [ ] Go to Dashboard
- [ ] **VERIFY**: Total Balance increased by ₦50,000
- [ ] **VERIFY**: Monthly Income shows: +₦50,000

### 2. Add Expense
**Path**: Dashboard → Quick Actions → Send

- [ ] Amount: 8000
- [ ] Category: "Transport"
- [ ] Wallet: "Main Wallet"
- [ ] Tap "Save Expense"
- [ ] Go to Dashboard
- [ ] **VERIFY**: Total Balance decreased by ₦8,000
- [ ] **VERIFY**: Monthly Expenses shows: -₦[total expenses]
- [ ] **VERIFY**: Budget Status → Transport shows spent amount

**✅ All balances sync automatically!**

### 3. Daily vs Monthly Toggle
**Path**: Dashboard → Balance Card → Toggle buttons

- [ ] Tap "Daily"
- [ ] **VERIFY**: Shows only today's income/expenses
- [ ] **VERIFY**: Changes from "Monthly" to "Today's" labels
- [ ] Tap "Monthly"
- [ ] **VERIFY**: Shows current month's totals
- [ ] Add expense, check both views
- [ ] **VERIFY**: Preference saves on app restart

**✅ Period toggle works!**

---

## 📄 CSV Export Testing

### 1. Export Transactions
**Path**: Profile → Data → Export Transactions

- [ ] Tap "Export Transactions"
- [ ] **VERIFY**: Loading indicator shows
- [ ] **VERIFY**: Success alert
- [ ] **VERIFY**: Share dialog opens (iOS/Android)
- [ ] Save or share CSV file
- [ ] Open CSV in spreadsheet app
- [ ] **VERIFY**: Headers: Date, Type, Category, Amount, Wallet, Notes
- [ ] **VERIFY**: All transactions listed
- [ ] **VERIFY**: Sorted by date (newest first)

### 2. Export Budgets
- [ ] Tap "Export Budgets"
- [ ] **VERIFY**: CSV exported
- [ ] Open file
- [ ] **VERIFY**: Shows: Month, Income, Category, Allocated, Spent, Remaining, Progress %

### 3. Export Goals
- [ ] Tap "Export Savings Goals"
- [ ] **VERIFY**: CSV exported
- [ ] **VERIFY**: Shows: Goal Name, Target, Current, Remaining, Progress %, Deadline, Status

**✅ CSV export is functional!**

---

## 🔒 PIN Security Testing

### 1. Lock App
- [ ] Close app completely
- [ ] Reopen app
- [ ] **VERIFY**: Enter PIN screen shows
- [ ] Enter wrong PIN
- [ ] **VERIFY**: Error message shows
- [ ] **VERIFY**: "4 attempts remaining"

### 2. Rate Limiting
- [ ] Enter wrong PIN 5 times
- [ ] **VERIFY**: After 5 attempts, locked out
- [ ] **VERIFY**: "Too many failed attempts" message
- [ ] **VERIFY**: Countdown timer shows (5 minutes)
- [ ] **VERIFY**: PIN input disabled during lockout

### 3. Successful Unlock
- [ ] Wait for lockout to end (or restart app after 5 min)
- [ ] Enter correct PIN
- [ ] **VERIFY**: Navigates to dashboard
- [ ] **VERIFY**: All data intact

**✅ PIN security works!**

---

## 🐛 Error Testing (Previously Fixed)

### 1. Navigation Errors
- [ ] Create budget → Save → OK
- [ ] **VERIFY**: NO "GO_BACK not handled" error in console
- [ ] Create goal → Save → OK
- [ ] **VERIFY**: NO "GO_BACK not handled" error

### 2. Text Node Errors
- [ ] Navigate to Create Goal screen
- [ ] Scroll to "Tips for Success" section
- [ ] **VERIFY**: NO "Unexpected text node" error in console
- [ ] Navigate to Create Budget (Step 3)
- [ ] **VERIFY**: NO text node errors

### 3. Total Balance
- [ ] Remove all wallets (if possible)
- [ ] **VERIFY**: Total Balance shows ₦0
- [ ] Add wallet with balance
- [ ] **VERIFY**: Total Balance immediately updates
- [ ] Add transaction
- [ ] **VERIFY**: Balance changes correctly

**✅ All previous errors fixed!**

---

## 📱 UI/UX Testing

### 1. Minimalistic Design
- [ ] **VERIFY**: 5 tabs in nav bar (Home, Transactions, Add, Budgets, Profile)
- [ ] **VERIFY**: Add button is centered and elevated
- [ ] **VERIFY**: Clean, not overwhelming
- [ ] **VERIFY**: Light background colors throughout

### 2. Icons
- [ ] **VERIFY**: All emojis replaced with Ionicons
- [ ] **VERIFY**: Icons consistent across app
- [ ] Check: Dashboard, Transactions, Budget, Goals, Profile

### 3. Inputs
- [ ] Test all input fields can be edited
- [ ] Test all dropdowns show/hide properly
- [ ] Test all pickers work correctly
- [ ] **VERIFY**: No frozen inputs

### 4. Responsive
- [ ] Scroll through dashboard
- [ ] **VERIFY**: All sections visible
- [ ] **VERIFY**: No content cut off
- [ ] **VERIFY**: Tab bar always visible at bottom

**✅ UI is minimalistic and functional!**

---

## 🎯 Final Checklist

### Core Features:
- [x] Track expenses & income
- [x] Budget management
- [x] Savings goals
- [x] PIN lock on every launch
- [x] CSV export
- [x] Daily/Monthly feed toggle
- [x] 5-tab navigation
- [x] Budget status on dashboard
- [x] Goals overview on dashboard

### Data Sync:
- [x] Wallet balances update with transactions
- [x] Budget spending updates with expenses
- [x] Dashboard shows real-time data
- [x] All data persists on app restart

### Bug Fixes:
- [x] No "GO_BACK not handled" errors
- [x] No "Unexpected text node" errors
- [x] Total balance calculates correctly
- [x] Success screens navigate properly

### Performance:
- [x] App loads quickly
- [x] No lag when switching tabs
- [x] Smooth scrolling
- [x] No crashes

---

## ✅ Test Report Template

After testing, record results:

```
DENARI v1.0 Test Report
Date: [Date]
Tester: [Name]

🟢 PASSED (Count):
- Feature 1
- Feature 2
...

🔴 FAILED (Count):
- Issue 1: [Description]
- Issue 2: [Description]

⚠️ WARNINGS (Count):
- Warning 1
...

💡 SUGGESTIONS:
- Improvement 1
...

Overall Status: [READY / NEEDS FIXES]
```

---

## 📊 Expected Results Summary

**Dashboard Should Show:**
- ✅ User greeting with name
- ✅ Total balance (sum of all wallets)
- ✅ Daily/Monthly toggle with accurate calculations
- ✅ Budget status with progress bars (if budget exists)
- ✅ Savings goals with progress (if goals exist)
- ✅ Quick actions (Send, Receive, Budget, Goals)
- ✅ Recent 5 transactions

**All Numbers Should Be:**
- ✅ Realistic (from actual user data)
- ✅ In sync across all screens
- ✅ Updated in real-time
- ✅ Persisted across app restarts

**No Errors Should Appear:**
- ✅ No "GO_BACK not handled"
- ✅ No "Unexpected text node"
- ✅ No undefined variables
- ✅ No navigation failures

---

## 🚀 Ready for Production!

If all tests pass, DENARI v1.0 is ready for:
- Beta testing
- App store submission
- User onboarding
- Production deployment

**Good luck testing! 🎉**
