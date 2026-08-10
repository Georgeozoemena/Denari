# DENARI v1.0 — LOCAL-FIRST PERSONAL FINANCE TRACKER

## Product Vision

DENARI v1.0 is a **secure, offline-first personal finance tracker** for individuals who want to manage their money privately on their device without cloud sync.

**Target User:** Privacy-conscious individuals who want local-only financial tracking  
**Platform:** iOS & Android (React Native/Expo)  
**Storage:** Local AsyncStorage (no cloud, no backend)

---

## Core Features (v1.0)

### ✅ 1. Track Income & Expenses
- Add income transactions
- Add expense transactions
- Categorize transactions
- Add notes and dates
- Link to wallets/accounts
- **Auto-update** wallet balances
- **Auto-update** budget spending

### ✅ 2. Multiple Wallets/Accounts
- Cash wallet
- Bank accounts
- Mobile money
- View total balance across all wallets
- Track balance per wallet

### ⚠️ 3. Budget Management (NEEDS UI)
**Architecture Ready** - Need to implement:
- Budget creation wizard
- Category-based budgets
- Monthly budget limits
- Automatic spending tracking
- Visual progress indicators
- Budget vs. Actual reports

### ⚠️ 4. Savings Goals (NEEDS UI)
**Architecture Ready** - Need to implement:
- Create savings goals
- Set target amounts
- Set target dates
- Track progress
- Add contributions
- Visual progress bars

### ✅ 5. PIN Security Gate
**IMPLEMENTED & IMPROVED**
- 4-digit PIN on app launch
- SHA-256-equivalent hashing (djb2 + salt)
- **Rate limiting:** 5 attempts max
- **Lockout:** 5 minutes after failed attempts
- **Countdown** display during lockout
- PIN required on every app open

### ❌ 6. CSV Export (NOT IMPLEMENTED)
**NEEDS IMPLEMENTATION:**
- Export all transactions to CSV
- Export budgets to CSV
- Export savings goals to CSV
- Share/email CSV files
- Date range filtering

### ⚠️ 7. Daily/Monthly Feed (PARTIAL)
**Dashboard shows:**
- ✅ Total balance
- ✅ Monthly income
- ✅ Monthly expenses
- ✅ Recent transactions (5 latest)
- ❌ Daily view toggle
- ❌ Monthly summary cards
- ❌ Spending trends
- ❌ Category breakdown

---

## Feature Implementation Status

| Feature | Status | Priority | Notes |
|---------|--------|----------|-------|
| Track Expenses | ✅ DONE | P0 | Fully functional |
| Track Income | ✅ DONE | P0 | Fully functional |
| Multiple Wallets | ✅ DONE | P0 | Auto-balance updates |
| PIN Lock | ✅ IMPROVED | P0 | Rate limiting added |
| Onboarding Flow | ✅ DONE | P0 | Splash → Welcome → Setup |
| Dashboard | ✅ DONE | P0 | Balance, transactions |
| Transactions List | ✅ DONE | P1 | Filter by type |
| Analytics Screen | ✅ DONE | P1 | Hardcoded data |
| Profile Screen | ✅ DONE | P1 | Settings menu |
| Budget Management | ❌ TODO | P1 | **Need UI screens** |
| Savings Goals | ❌ TODO | P1 | **Need UI screens** |
| CSV Export | ❌ TODO | P1 | **Need implementation** |
| Daily Feed | ❌ TODO | P2 | **Need UI component** |
| Monthly Feed | ⚠️ PARTIAL | P2 | Dashboard shows monthly |
| Receipt Attachments | ❌ TODO | P2 | Future feature |
| Recurring Transactions | ❌ TODO | P3 | Future feature |
| Data Backup | ❌ TODO | P3 | Manual export only |

---

## Security Features (v1.0)

### ✅ Implemented

1. **PIN Protection**
   - 4-digit PIN requirement
   - Hashed storage (not plain text)
   - Rate limiting (5 attempts max)
   - 5-minute lockout after failed attempts
   - PIN required on every app launch

2. **Data Privacy**
   - All data stored locally
   - No cloud sync
   - No telemetry/analytics
   - No third-party services

3. **Session Management**
   - User must enter PIN on app open
   - No automatic login
   - Logout clears session

### ⚠️ Limitations (v1.0 Acceptable)

1. **AsyncStorage** - Not encrypted by default
   - Data readable if device is rooted/jailbroken
   - Data included in device backups
   - **Mitigation:** PIN prevents casual access

2. **Client-Side Everything**
   - No server validation
   - App modifications possible
   - **Mitigation:** For personal use only

3. **No Multi-Device Sync**
   - Each device is independent
   - Data loss if device lost
   - **Mitigation:** CSV export for backup

### 🔄 Future (v2.0)

1. expo-secure-store for encrypted storage
2. Biometric authentication (Touch ID/Face ID)
3. Cloud backup (optional, encrypted)
4. Device encryption verification

---

## Data Flow (v1.0)

```
USER ACTION
    ↓
UI SCREEN
    ↓
CONTEXT ACTION (addTransaction, addBudget, etc.)
    ↓
LOCAL STATE UPDATE
    ↓
ASYNC STORAGE (Auto-save)
    ↓
UI RE-RENDERS (Real-time update)
```

### Example: Add Expense

```typescript
1. User fills expense form
2. User taps "Save Expense"
3. addTransaction() called
4. New transaction created
5. Wallet balance decreased
6. Budget spending increased
7. State saved to AsyncStorage
8. Dashboard updates automatically
```

### Atomic Updates

Transactions update multiple entities in one operation:
- Transaction record
- Wallet balance
- Budget spending (if expense)

All updates happen in setState() callback → atomic at app level.

---

## Missing Features (TODO)

### 1. Budget Management UI 🔴 **HIGH PRIORITY**

**Required Screens:**
- `/budgets` - List all budgets
- `/create-budget` - Budget creation wizard
- `/budget/[id]` - Budget detail with progress

**Features:**
- Create monthly budget
- Assign categories
- Set spending limits
- View progress (spent/limit)
- Visual progress bars
- Category breakdown
- Over-budget alerts

**Architecture:** Already implemented in Context, just need UI.

### 2. Savings Goals UI 🔴 **HIGH PRIORITY**

**Required Screens:**
- `/savings` - List all goals
- `/create-goal` - Goal creation
- `/goal/[id]` - Goal detail with progress

**Features:**
- Create savings goal
- Set target amount
- Set target date
- Track progress
- Add contributions
- Visual progress indicators
- Milestone celebrations

**Architecture:** Already implemented in Context, just need UI.

### 3. CSV Export 🔴 **HIGH PRIORITY**

**Required:**
- Export service function
- Share functionality (react-native-share or expo-sharing)
- Date range picker
- Format: CSV with headers
- Fields: Date, Type, Category, Amount, Wallet, Notes

**Implementation:**
```typescript
// src/services/export.ts
export async function exportTransactionsCSV(transactions, dateRange) {
  const csv = generateCSV(transactions);
  await Share.share({ url: csvFileUri });
}
```

### 4. Daily/Monthly Feed ⚠️ **MEDIUM PRIORITY**

**Dashboard Enhancements:**
- Toggle: Daily | Monthly view
- Daily summary card
  - Today's income
  - Today's expenses
  - Net change
- Monthly summary card (already showing)
  - Month total income
  - Month total expenses
  - Top categories
- Spending trends chart
- Quick stats

---

## User Flows (v1.0)

### First Time User

```
1. Open App
2. Splash Screen (3s)
3. Welcome Screen
4. Sign Up (Name, Email, Phone, Password - local only)
5. OTP Screen (UI only, accepts any code)
6. Create 4-digit PIN
7. Profile Setup (First name, Last name)
8. Choose Currency (NGN, USD, EUR, GBP)
9. Success Screen
10. Dashboard (Empty state)
```

### Returning User

```
1. Open App
2. PIN Entry Screen
3. Enter 4-digit PIN
4. Dashboard
```

### Add Expense

```
1. Dashboard → "+" Button → Add Expense
2. Enter Amount
3. Select Category
4. Select Wallet
5. Add Date (default: today)
6. Add Notes (optional)
7. Save
8. → Wallet balance updated
   → Budget updated
   → Dashboard refreshes
```

### View Transactions

```
1. Dashboard → "Transactions" Tab
2. View list (All / Income / Expense filter)
3. Tap transaction → Details (future)
```

### Logout

```
1. Profile → Logout
2. Confirm
3. Clear all data
4. Back to Welcome Screen
```

---

## Performance Considerations

### Data Size Limits

**AsyncStorage Recommendations:**
- Max 6MB recommended
- Store only recent data
- Archive old transactions (future)

**v1.0 Limits:**
- ~10,000 transactions before slowdown
- ~100 budgets
- ~50 savings goals

### Optimization Strategies

1. **Pagination** - Load recent transactions first
2. **Lazy Loading** - Load details on demand
3. **Memoization** - Use useMemo for calculations
4. **Virtual Lists** - For long transaction lists

---

## Data Backup Strategy

### v1.0: Manual Backup

1. **CSV Export** (primary backup method)
   - Export transactions monthly
   - Save to Files/Google Drive/iCloud
   - Manual restore via import (future)

2. **Device Backup** (automatic)
   - AsyncStorage included in iOS/Android backups
   - Restore on device restore

### v2.0: Cloud Backup (Future)

- Optional encrypted cloud sync
- Cross-device synchronization
- Automatic backups

---

## Known Limitations & Trade-offs

### Accepted for v1.0

✅ **Local-only storage**
- Trade-off: Simplicity, privacy, offline-first
- Limitation: No multi-device sync

✅ **Client-side calculations**
- Trade-off: Fast, no network dependency
- Limitation: Can be modified if device compromised

✅ **No real authentication**
- Trade-off: Simpler architecture
- Limitation: OTP is UI-only

✅ **AsyncStorage (unencrypted)**
- Trade-off: Standard React Native storage
- Limitation: Accessible if device rooted

✅ **JavaScript floating-point for money**
- Trade-off: Simplicity
- Limitation: Potential rounding errors (minor for personal use)

### Future Improvements (v2.0+)

- expo-secure-store (encrypted storage)
- Biometric authentication
- Backend API (optional)
- Cloud sync (optional, encrypted)
- Receipt image attachments
- Recurring transactions
- Data import/export
- Multi-currency conversion
- Budget templates
- Financial insights/AI

---

## Development Priorities

### Phase 1: Complete Core Features (Current Sprint)

1. ✅ Fix PIN security (rate limiting, lockout)
2. 🔄 Implement Budget Management UI
3. 🔄 Implement Savings Goals UI
4. 🔄 Implement CSV Export
5. 🔄 Add Daily/Monthly feed toggle

### Phase 2: Polish & UX

1. Empty states for all screens
2. Loading states
3. Error handling improvements
4. Animations & transitions
5. Accessibility improvements

### Phase 3: Advanced Features

1. Transaction search
2. Category management
3. Custom categories
4. Receipt attachments
5. Recurring transactions

### Phase 4: v2.0 Planning

1. Backend API design
2. Cloud sync architecture
3. Multi-device support
4. Security audit
5. App Store preparation

---

## Testing Checklist

### Core Functionality

- [ ] Create account
- [ ] Set PIN
- [ ] Login with PIN
- [ ] Add expense
- [ ] Add income
- [ ] View transactions
- [ ] Filter transactions
- [ ] View balance
- [ ] Logout
- [ ] Re-login

### Security

- [x] PIN required on app open
- [x] PIN hashed (not plain text)
- [x] Rate limiting works (5 attempts)
- [x] Lockout after failed attempts
- [ ] Data persists after app close
- [ ] Logout clears data

### Financial Accuracy

- [ ] Expense decreases balance
- [ ] Income increases balance
- [ ] Budget updates on expense
- [ ] Total balance = sum of wallets
- [ ] Monthly totals correct

### Edge Cases

- [ ] Empty states work
- [ ] Negative amounts rejected
- [ ] Invalid dates handled
- [ ] App crash recovery
- [ ] Memory limits respected

---

## Release Criteria (v1.0)

### Must Have ✅

- [x] Track expenses
- [x] Track income
- [x] Multiple wallets
- [x] PIN lock on launch
- [ ] Budget management
- [ ] Savings goals
- [ ] CSV export
- [ ] Daily/Monthly feed

### Nice to Have (Can defer to v1.1)

- [ ] Receipt attachments
- [ ] Transaction search
- [ ] Custom categories
- [ ] Biometric unlock
- [ ] Data backup reminder

### Documentation

- [ ] User guide
- [ ] Privacy policy
- [ ] Terms of service
- [ ] App Store description
- [ ] Screenshots

---

## Success Metrics (v1.0)

1. **User Onboarding:** < 2 minutes from open to first transaction
2. **App Performance:** < 100ms transaction creation
3. **Data Safety:** PIN lockout prevents brute force
4. **User Privacy:** Zero telemetry, all local
5. **Stability:** No crashes on typical usage

---

**Status:** v1.0 in active development  
**Next Milestone:** Complete Budget & Savings UI  
**Target Release:** TBD after feature completion
