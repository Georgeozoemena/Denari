import { DEFAULT_STATE, loadState, saveState } from '@/services/storage';
import type { AppState, Budget, SavingsGoal, Transaction, UserProfile, Wallet } from '@/types';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface AppContextType extends AppState {
  // User actions
  setUser: (user: UserProfile) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  logout: () => void;
  
  // Wallet actions
  addWallet: (wallet: Omit<Wallet, 'id'>) => void;
  updateWallet: (id: string, updates: Partial<Wallet>) => void;
  deleteWallet: (id: string) => void;
  updateWalletBalance: (id: string, amount: number) => void;
  
  // Transaction actions
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  
  // Budget actions
  addBudget: (budget: Omit<Budget, 'id'>) => void;
  updateBudget: (id: string, updates: Partial<Budget>) => void;
  updateBudgetSpending: (categoryName: string, amount: number) => void;
  
  // Savings goal actions
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id'>) => void;
  updateSavingsGoal: (id: string, updates: Partial<SavingsGoal>) => void;
  deleteSavingsGoal: (id: string) => void;
  
  // Loading state
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [isLoading, setIsLoading] = useState(true);

  // Load state on mount
  useEffect(() => {
    loadState().then((loadedState) => {
      setState(loadedState);
      setIsLoading(false);
    });
  }, []);

  // Save state whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveState(state);
    }
  }, [state, isLoading]);

  // User actions
  const setUser = (user: UserProfile) => {
    setState((prev) => ({ ...prev, user, isAuthenticated: true }));
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setState((prev) => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...updates } : null,
    }));
  };

  const logout = () => {
    setState(DEFAULT_STATE);
  };

  // Wallet actions
  const addWallet = (wallet: Omit<Wallet, 'id'>) => {
    const newWallet: Wallet = {
      ...wallet,
      id: Date.now().toString(),
    };
    setState((prev) => ({
      ...prev,
      wallets: [newWallet, ...prev.wallets],
    }));
  };

  const updateWallet = (id: string, updates: Partial<Wallet>) => {
    setState((prev) => ({
      ...prev,
      wallets: prev.wallets.map((w) =>
        w.id === id ? { ...w, ...updates } : w
      ),
    }));
  };

  const deleteWallet = (id: string) => {
    setState((prev) => ({
      ...prev,
      wallets: prev.wallets.filter((w) => w.id !== id),
    }));
  };

  const updateWalletBalance = (id: string, amount: number) => {
    setState((prev) => ({
      ...prev,
      wallets: prev.wallets.map((w) =>
        w.id === id ? { ...w, balance: w.balance + amount } : w
      ),
    }));
  };

  // Transaction actions with auto-update of wallet balance and budget
  const addTransaction = (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    setState((prev) => {
      const newState = { ...prev };
      
      // Add transaction
      newState.transactions = [newTransaction, ...prev.transactions];
      
      // Update wallet balance
      const walletIndex = newState.wallets.findIndex(w => w.id === transaction.walletId);
      if (walletIndex !== -1) {
        const balanceChange = transaction.type === 'income' ? transaction.amount : -transaction.amount;
        newState.wallets[walletIndex] = {
          ...newState.wallets[walletIndex],
          balance: newState.wallets[walletIndex].balance + balanceChange,
        };
      }
      
      // Update budget spending if expense
      if (transaction.type === 'expense') {
        const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
        const budgetIndex = newState.budgets.findIndex(b => b.month === currentMonth);
        
        if (budgetIndex !== -1) {
          const categoryIndex = newState.budgets[budgetIndex].categories.findIndex(
            c => c.name === transaction.category
          );
          
          if (categoryIndex !== -1) {
            newState.budgets[budgetIndex].categories[categoryIndex] = {
              ...newState.budgets[budgetIndex].categories[categoryIndex],
              spent: newState.budgets[budgetIndex].categories[categoryIndex].spent + transaction.amount,
            };
          }
        }
      }
      
      return newState;
    });
  };

  const deleteTransaction = (id: string) => {
    setState((prev) => ({
      ...prev,
      transactions: prev.transactions.filter((t) => t.id !== id),
    }));
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setState((prev) => ({
      ...prev,
      transactions: prev.transactions.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    }));
  };

  // Budget actions
  const addBudget = (budget: Omit<Budget, 'id'>) => {
    const newBudget: Budget = {
      ...budget,
      id: Date.now().toString(),
    };
    setState((prev) => ({
      ...prev,
      budgets: [newBudget, ...prev.budgets],
    }));
  };

  const updateBudget = (id: string, updates: Partial<Budget>) => {
    setState((prev) => ({
      ...prev,
      budgets: prev.budgets.map((b) =>
        b.id === id ? { ...b, ...updates } : b
      ),
    }));
  };

  const updateBudgetSpending = (categoryName: string, amount: number) => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    setState((prev) => ({
      ...prev,
      budgets: prev.budgets.map((b) => {
        if (b.month !== currentMonth) return b;
        return {
          ...b,
          categories: b.categories.map((c) =>
            c.name === categoryName
              ? { ...c, spent: c.spent + amount }
              : c
          ),
        };
      }),
    }));
  };

  // Savings goal actions
  const addSavingsGoal = (goal: Omit<SavingsGoal, 'id'>) => {
    const newGoal: SavingsGoal = {
      ...goal,
      id: Date.now().toString(),
    };
    setState((prev) => ({
      ...prev,
      savingsGoals: [newGoal, ...prev.savingsGoals],
    }));
  };

  const updateSavingsGoal = (id: string, updates: Partial<SavingsGoal>) => {
    setState((prev) => ({
      ...prev,
      savingsGoals: prev.savingsGoals.map((g) =>
        g.id === id ? { ...g, ...updates } : g
      ),
    }));
  };

  const deleteSavingsGoal = (id: string) => {
    setState((prev) => ({
      ...prev,
      savingsGoals: prev.savingsGoals.filter((g) => g.id !== id),
    }));
  };

  const value: AppContextType = {
    ...state,
    setUser,
    updateUser,
    logout,
    addWallet,
    updateWallet,
    deleteWallet,
    updateWalletBalance,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    addBudget,
    updateBudget,
    updateBudgetSpending,
    addSavingsGoal,
    updateSavingsGoal,
    deleteSavingsGoal,
    isLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
