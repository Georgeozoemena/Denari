// Transaction Types
export type TransactionType = 'income' | 'expense' | 'transfer';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  date: string;
  notes?: string;
  paymentMethod?: string;
  merchant?: string;
  fromAccount?: string;
  toAccount?: string;
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
  monthlyIncome: number;
  categories: BudgetCategory[];
  month: string; // Format: YYYY-MM
}

// Savings Goal Types
export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  icon: string;
  color: string;
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
}

// App State Types
export interface AppState {
  user: UserProfile | null;
  transactions: Transaction[];
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
  isAuthenticated: boolean;
}
