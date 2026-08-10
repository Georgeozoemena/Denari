import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { formScreenStyles as fs } from '@/styles/form-screen';
import { getCurrencySymbol } from '@/utils/currency';

const CATEGORIES = [
  { id: 'food', name: 'Food & Dining', icon: 'restaurant' },
  { id: 'transport', name: 'Transport', icon: 'car' },
  { id: 'shopping', name: 'Shopping', icon: 'cart' },
  { id: 'entertainment', name: 'Entertainment', icon: 'film' },
  { id: 'bills', name: 'Bills', icon: 'receipt' },
  { id: 'health', name: 'Health', icon: 'medkit' },
  { id: 'other', name: 'Other', icon: 'ellipse' },
];

export default function AddExpenseScreen() {
  const router = useRouter();
  const colors = Colors.light;
  const { addTransaction, wallets, user, budgets } = useApp();

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [walletId, setWalletId] = useState(wallets[0]?.id || '');
  const [notes, setNotes] = useState('');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showWalletPicker, setShowWalletPicker] = useState(false);

  const selectedCategory = CATEGORIES.find((c) => c.id === category);
  const selectedWallet = wallets.find((w) => w.id === walletId);
  const currencySymbol = getCurrencySymbol(user?.currency);

  const handleSave = () => {
    const numAmount = parseFloat(amount.replace(/,/g, ''));
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    if (!walletId || !selectedWallet) {
      Alert.alert('Select Wallet', 'Please select a wallet for this expense');
      return;
    }

    if (selectedWallet.balance < numAmount) {
      Alert.alert(
        'Insufficient Balance',
        `${selectedWallet.name} has only ${currencySymbol}${selectedWallet.balance.toLocaleString()}`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Continue Anyway', onPress: () => checkBudgetAndSave(numAmount) },
        ],
      );
      return;
    }

    checkBudgetAndSave(numAmount);
  };

  const checkBudgetAndSave = (numAmount: number) => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const currentBudget = budgets.find((b) => b.month === currentMonth);

    if (!currentBudget) {
      saveExpense(numAmount);
      return;
    }

    const budgetCategory = currentBudget.categories.find((cat) => cat.name === selectedCategory?.name);

    if (!budgetCategory) {
      saveExpense(numAmount);
      return;
    }

    const newTotal = budgetCategory.spent + numAmount;
    const percentage = (newTotal / budgetCategory.allocated) * 100;

    if (newTotal > budgetCategory.allocated) {
      const overAmount = newTotal - budgetCategory.allocated;
      Alert.alert(
        'Budget Alert',
        `This expense will put you over budget:\n\nCategory: ${budgetCategory.name}\nCurrent: ${currencySymbol}${budgetCategory.spent.toLocaleString()} / ${currencySymbol}${budgetCategory.allocated.toLocaleString()}\nNew expense: ${currencySymbol}${numAmount.toLocaleString()}\nAfter: ${currencySymbol}${newTotal.toLocaleString()} (${currencySymbol}${overAmount.toLocaleString()} over)\n\nContinue anyway?`,
        [
          { text: 'Go Back', style: 'cancel' },
          { text: 'Save Anyway', onPress: () => saveExpense(numAmount), style: 'destructive' },
        ],
      );
      return;
    }

    if (percentage >= 80) {
      const remaining = budgetCategory.allocated - newTotal;
      Alert.alert(
        'Budget Notice',
        `You've used ${percentage.toFixed(0)}% of your ${budgetCategory.name} budget.\n\nSpent: ${currencySymbol}${newTotal.toLocaleString()}\nBudget: ${currencySymbol}${budgetCategory.allocated.toLocaleString()}\nRemaining: ${currencySymbol}${remaining.toLocaleString()}\n\nContinue?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Continue', onPress: () => saveExpense(numAmount) },
        ],
      );
      return;
    }

    saveExpense(numAmount);
  };

  const saveExpense = (numAmount: number) => {
    try {
      addTransaction({
        userId: user?.id || 'local',
        walletId,
        type: 'expense',
        amount: numAmount,
        category: selectedCategory?.name || 'Other',
        date: new Date(date).toISOString(),
        notes: notes || undefined,
      });

      Alert.alert('Success', 'Expense added successfully!', [{ text: 'OK', onPress: () => router.back() }]);
    } catch (error) {
      console.error('Error adding expense:', error);
      Alert.alert('Error', 'Failed to add expense. Please try again.');
    }
  };

  return (
    <View style={fs.container}>
      <View style={fs.header}>
        <Pressable onPress={() => router.back()} style={fs.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[fs.title, { color: colors.text }]}>Add Expense</Text>
        <View style={fs.placeholder} />
      </View>

      <ScrollView style={fs.scrollView} contentContainerStyle={fs.content} keyboardShouldPersistTaps="handled">
        <View style={[fs.heroAmountCard, { borderColor: colors.border }]}>
          <View style={[fs.heroAmountTop, { backgroundColor: colors.expenseSoft }]}>
            <Text style={[fs.heroAmountLabel, { color: colors.expense }]}>Amount</Text>
          </View>
          <View style={fs.heroAmountBody}>
            <View style={fs.amountContainer}>
              <Text style={[fs.currency, { color: colors.text }]}>{currencySymbol}</Text>
              <TextInput
                style={[fs.amountInput, { color: colors.text }]}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={colors.textTertiary}
                autoFocus
              />
            </View>
          </View>
        </View>

        <View style={fs.field}>
          <Text style={fs.fieldLabel}>Category</Text>
          <Pressable
            style={fs.picker}
            onPress={() => {
              setShowCategoryPicker(!showCategoryPicker);
              setShowWalletPicker(false);
            }}>
            <View style={fs.pickerLeft}>
              <View style={[fs.iconCircle, { backgroundColor: colors.expenseSoft }]}>
                <Ionicons name={selectedCategory?.icon as any} size={20} color={colors.expense} />
              </View>
              <Text style={[fs.pickerText, { color: colors.text }]}>{selectedCategory?.name}</Text>
            </View>
            <Ionicons
              name={showCategoryPicker ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={colors.textTertiary}
            />
          </Pressable>

          {showCategoryPicker && (
            <View style={[fs.dropdown, { backgroundColor: colors.backgroundElevated }]}>
              {CATEGORIES.map((cat) => (
                <Pressable
                  key={cat.id}
                  style={[fs.dropdownItem, category === cat.id && { backgroundColor: colors.expenseSoft }]}
                  onPress={() => {
                    setCategory(cat.id);
                    setShowCategoryPicker(false);
                  }}>
                  <View style={fs.pickerLeft}>
                    <View style={[fs.iconCircleSmall, { backgroundColor: colors.expenseSoft }]}>
                      <Ionicons name={cat.icon as any} size={16} color={colors.expense} />
                    </View>
                    <Text style={[fs.dropdownText, { color: colors.text }]}>{cat.name}</Text>
                  </View>
                  {category === cat.id && <Ionicons name="checkmark" size={20} color={colors.expense} />}
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View style={fs.field}>
          <Text style={fs.fieldLabel}>Wallet</Text>
          <Pressable
            style={fs.picker}
            onPress={() => {
              setShowWalletPicker(!showWalletPicker);
              setShowCategoryPicker(false);
            }}>
            <View style={fs.pickerLeft}>
              <View style={[fs.iconCircle, { backgroundColor: colors.primarySoft }]}>
                <Ionicons name="wallet" size={20} color={colors.primary} />
              </View>
              <View>
                <Text style={[fs.pickerText, { color: colors.text }]}>
                  {selectedWallet?.name || 'Select wallet'}
                </Text>
                {selectedWallet && (
                  <Text style={[styles.walletBalance, { color: colors.textSecondary }]}>
                    Balance: {currencySymbol}
                    {selectedWallet.balance.toLocaleString()}
                  </Text>
                )}
              </View>
            </View>
            <Ionicons
              name={showWalletPicker ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={colors.textTertiary}
            />
          </Pressable>

          {showWalletPicker && (
            <View style={[fs.dropdown, { backgroundColor: colors.backgroundElevated }]}>
              {wallets.length === 0 ? (
                <View style={fs.dropdownItem}>
                  <Text style={[fs.dropdownText, { color: colors.textSecondary }]}>No wallets available</Text>
                </View>
              ) : (
                wallets.map((wallet) => (
                  <Pressable
                    key={wallet.id}
                    style={[fs.dropdownItem, walletId === wallet.id && { backgroundColor: colors.primarySoft }]}
                    onPress={() => {
                      setWalletId(wallet.id);
                      setShowWalletPicker(false);
                    }}>
                    <View style={fs.pickerLeft}>
                      <View style={[fs.iconCircleSmall, { backgroundColor: colors.primarySoft }]}>
                        <Ionicons name="wallet" size={16} color={colors.primary} />
                      </View>
                      <View>
                        <Text style={[fs.dropdownText, { color: colors.text }]}>{wallet.name}</Text>
                        <Text style={[styles.walletBalance, { color: colors.textSecondary }]}>
                          {currencySymbol}
                          {wallet.balance.toLocaleString()}
                        </Text>
                      </View>
                    </View>
                    {walletId === wallet.id && <Ionicons name="checkmark" size={20} color={colors.primary} />}
                  </Pressable>
                ))
              )}
            </View>
          )}
        </View>

        <View style={fs.field}>
          <Text style={fs.fieldLabel}>Date</Text>
          <View style={fs.picker}>
            <TextInput
              style={[fs.dateInput, { color: colors.text }]}
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={colors.textTertiary}
            />
            <Ionicons name="calendar-outline" size={20} color={colors.textTertiary} />
          </View>
        </View>

        <View style={fs.field}>
          <Text style={fs.fieldLabel}>Notes (Optional)</Text>
          <TextInput
            style={[fs.notesInput, { color: colors.text }]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Add a note..."
            placeholderTextColor={colors.textTertiary}
            multiline
            numberOfLines={3}
          />
        </View>
      </ScrollView>

      <View style={fs.footer}>
        <Button title="Save Expense" onPress={handleSave} style={fs.saveButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  walletBalance: {
    fontSize: 13,
    marginTop: 2,
  },
});
