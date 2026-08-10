// Transaction Types
export type TransactionType = 'income' | 'expense' | 'transfer';

export interface Transaction {
  id: string;
  userId: string;
  walletId: string; // Link to wallet/account
  type: TransactionType;
  amount: number;
  category: string;
  date: string;
  notes?: string;
  paymentMethod?: string;
  merchant?: string;
  fromAccount?: string; // For transfers
  toAccount?: string; // For transfers
  receipt?: string; // Receipt image URL
  createdAt: string;
}

// Wallet / Account Types
export interface Wallet {
  id: string;
  userId: string;
  name: string; // e.g., "Cash", "GTBank", "Opay"
  type: 'cash' | 'bank' | 'savings' | 'other';
  balance: number;
  currency: string;
  icon?: string;
  color?: string;
  isDefault: boolean;
}

// Budget Types
export interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  icon: string;
  color: string;
}

export interface Budget {
  id: string;
  userId: string;
  monthlyIncome: number;
  categories: BudgetCategory[];
  month: string; // Format: YYYY-MM
}

// Savings Goal Types
export interface SavingsGoal {
  id: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  icon: string;
  color: string;
  status: 'active' | 'completed' | 'paused';
}

// User Profile Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  currency: string;
  avatar?: string;
  dateOfBirth?: string;
  occupation?: string;
  hasCompletedOnboarding: boolean;
  pinHash?: string; // Encrypted PIN
  createdAt: string;
}

// App State Types
export interface AppState {
  user: UserProfile | null;
  wallets: Wallet[];
  transactions: Transaction[];
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
  isAuthenticated: boolean;
}
