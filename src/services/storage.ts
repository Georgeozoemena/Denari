import type { AppState } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@denari:app_state';

// Default state
export const DEFAULT_STATE: AppState = {
  user: null,
  transactions: [],
  budgets: [],
  savingsGoals: [],
  isAuthenticated: false,
};

// Load state from storage
export const loadState = async (): Promise<AppState> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }
    return DEFAULT_STATE;
  } catch (error) {
    console.error('Error loading state:', error);
    return DEFAULT_STATE;
  }
};

// Save state to storage
export const saveState = async (state: AppState): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(state);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

// Clear all data (for logout)
export const clearState = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing state:', error);
  }
};
