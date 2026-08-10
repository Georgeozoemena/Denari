import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';

import type { Budget, SavingsGoal, Transaction } from '@/types';

/**
 * Export transactions to CSV format
 */
export async function exportTransactionsCSV(
  transactions: Transaction[],
  startDate?: string,
  endDate?: string
): Promise<void> {
  try {
    // Filter transactions by date range if provided
    let filteredTransactions = transactions;
    if (startDate || endDate) {
      filteredTransactions = transactions.filter(tx => {
        const txDate = new Date(tx.date);
        if (startDate && txDate < new Date(startDate)) return false;
        if (endDate && txDate > new Date(endDate)) return false;
        return true;
      });
    }

    // Sort by date (newest first)
    filteredTransactions.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // CSV Header
    const headers = [
      'Date',
      'Type',
      'Category',
      'Amount',
      'Wallet',
      'Notes',
      'Payment Method',
      'Merchant',
    ];

    // CSV Rows
    const rows = filteredTransactions.map(tx => [
      new Date(tx.date).toISOString().split('T')[0], // YYYY-MM-DD
      tx.type,
      tx.category,
      tx.amount.toString(),
      tx.walletId,
      tx.notes || '',
      tx.paymentMethod || '',
      tx.merchant || '',
    ]);

    // Build CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    // Save to file
    const fileName = `denari_transactions_${new Date().toISOString().split('T')[0]}.csv`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    
    await FileSystem.writeAsStringAsync(fileUri, csvContent, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    // Share the file
    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/csv',
        dialogTitle: 'Export Transactions',
        UTI: 'public.comma-separated-values-text',
      });
    } else {
      throw new Error('Sharing is not available on this device');
    }
  } catch (error) {
    console.error('Error exporting transactions:', error);
    throw error;
  }
}

/**
 * Export budgets to CSV format
 */
export async function exportBudgetsCSV(budgets: Budget[]): Promise<void> {
  try {
    // Sort by month (newest first)
    const sortedBudgets = [...budgets].sort((a, b) => 
      b.month.localeCompare(a.month)
    );

    // CSV Header
    const headers = [
      'Month',
      'Monthly Income',
      'Category',
      'Allocated',
      'Spent',
      'Remaining',
      'Progress %',
    ];

    // CSV Rows (one row per budget category)
    const rows: string[][] = [];
    sortedBudgets.forEach(budget => {
      budget.categories.forEach(category => {
        const remaining = category.allocated - category.spent;
        const progress = category.allocated > 0 
          ? ((category.spent / category.allocated) * 100).toFixed(2) 
          : '0';
        
        rows.push([
          budget.month,
          budget.monthlyIncome.toString(),
          category.name,
          category.allocated.toString(),
          category.spent.toString(),
          remaining.toString(),
          progress,
        ]);
      });
    });

    // Build CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    // Save to file
    const fileName = `denari_budgets_${new Date().toISOString().split('T')[0]}.csv`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    
    await FileSystem.writeAsStringAsync(fileUri, csvContent, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    // Share the file
    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/csv',
        dialogTitle: 'Export Budgets',
        UTI: 'public.comma-separated-values-text',
      });
    } else {
      throw new Error('Sharing is not available on this device');
    }
  } catch (error) {
    console.error('Error exporting budgets:', error);
    throw error;
  }
}

/**
 * Export savings goals to CSV format
 */
export async function exportSavingsGoalsCSV(goals: SavingsGoal[]): Promise<void> {
  try {
    // Sort by deadline (nearest first)
    const sortedGoals = [...goals].sort((a, b) => 
      new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    );

    // CSV Header
    const headers = [
      'Goal Name',
      'Target Amount',
      'Current Amount',
      'Remaining',
      'Progress %',
      'Deadline',
      'Status',
    ];

    // CSV Rows
    const rows = sortedGoals.map(goal => {
      const remaining = goal.targetAmount - goal.currentAmount;
      const progress = goal.targetAmount > 0 
        ? ((goal.currentAmount / goal.targetAmount) * 100).toFixed(2) 
        : '0';
      
      return [
        goal.name,
        goal.targetAmount.toString(),
        goal.currentAmount.toString(),
        remaining.toString(),
        progress,
        new Date(goal.deadline).toISOString().split('T')[0],
        goal.status,
      ];
    });

    // Build CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    // Save to file
    const fileName = `denari_savings_goals_${new Date().toISOString().split('T')[0]}.csv`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    
    await FileSystem.writeAsStringAsync(fileUri, csvContent, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    // Share the file
    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/csv',
        dialogTitle: 'Export Savings Goals',
        UTI: 'public.comma-separated-values-text',
      });
    } else {
      throw new Error('Sharing is not available on this device');
    }
  } catch (error) {
    console.error('Error exporting savings goals:', error);
    throw error;
  }
}

/**
 * Export all data (transactions, budgets, savings goals) to a single CSV
 */
export async function exportAllDataCSV(
  transactions: Transaction[],
  budgets: Budget[],
  goals: SavingsGoal[]
): Promise<void> {
  try {
    // This will create separate files for each data type
    await Promise.all([
      exportTransactionsCSV(transactions),
      exportBudgetsCSV(budgets),
      exportSavingsGoalsCSV(goals),
    ]);
  } catch (error) {
    console.error('Error exporting all data:', error);
    throw error;
  }
}
