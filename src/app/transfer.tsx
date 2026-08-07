import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

const ACCOUNTS = [
  { id: 'gtbank', name: 'GTBank •••• 5678', icon: 'card', balance: '₦450,000' },
  { id: 'cash', name: 'Cash', icon: 'cash', balance: '₦25,000' },
  { id: 'zenith', name: 'Zenith Bank •••• 1234', icon: 'card', balance: '₦180,000' },
  { id: 'access', name: 'Access Bank •••• 9012', icon: 'card', balance: '₦95,000' },
];

export default function TransferScreen() {
  const router = useRouter();
  const colors = Colors.light;
  const { addTransaction } = useApp();

  const [amount, setAmount] = useState('');
  const [fromAccount, setFromAccount] = useState('gtbank');
  const [toAccount, setToAccount] = useState('cash');
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }));
  const [notes, setNotes] = useState('');
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const selectedFrom = ACCOUNTS.find(a => a.id === fromAccount);
  const selectedTo = ACCOUNTS.find(a => a.id === toAccount);

  const handleSave = () => {
    // Validate amount
    const numAmount = parseFloat(amount.replace(/,/g, ''));
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    // Check if same account
    if (fromAccount === toAccount) {
      Alert.alert('Invalid Transfer', 'Cannot transfer to the same account');
      return;
    }

    // Save transaction
    addTransaction({
      type: 'transfer',
      amount: numAmount,
      category: 'Transfer',
      date: new Date().toISOString(),
      notes,
      fromAccount: selectedFrom?.name || '',
      toAccount: selectedTo?.name || '',
    });

    Alert.alert('Success', 'Transfer completed successfully!');
    router.back();
  };

  const selectFromAccount = (accountId: string) => {
    setFromAccount(accountId);
    setShowFromPicker(false);
  };

  const selectToAccount = (accountId: string) => {
    setToAccount(accountId);
    setShowToPicker(false);
  };

  const swapAccounts = () => {
    const temp = fromAccount;
    setFromAccount(toAccount);
    setToAccount(temp);
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Transfer</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        
        {/* Amount Field */}
        <View style={[styles.field, { backgroundColor: colors.backgroundElevated }]}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Amount</Text>
          <View style={styles.amountContainer}>
            <Text style={[styles.currency, { color: colors.text }]}>₦</Text>
            <TextInput
              style={[styles.amountInput, { color: colors.text }]}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>

        {/* From Account Picker */}
        <View style={[styles.field, { backgroundColor: colors.backgroundElevated }]}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>From Account</Text>
          <Pressable 
            style={styles.picker}
            onPress={() => {
              setShowFromPicker(!showFromPicker);
              setShowToPicker(false);
            }}>
            <View style={styles.pickerLeft}>
              <View style={[styles.iconCircle, { backgroundColor: '#007AFF' }]}>
                <Ionicons name={selectedFrom?.icon as any} size={20} color="#FFFFFF" />
              </View>
              <View>
                <Text style={[styles.pickerText, { color: colors.text }]}>
                  {selectedFrom?.name}
                </Text>
                <Text style={[styles.balanceText, { color: colors.textSecondary }]}>
                  {selectedFrom?.balance}
                </Text>
              </View>
            </View>
            <Ionicons 
              name={showFromPicker ? "chevron-up" : "chevron-down"} 
              size={20} 
              color={colors.textSecondary} 
            />
          </Pressable>

          {/* From Account Dropdown */}
          {showFromPicker && (
            <View style={[styles.dropdown, { backgroundColor: colors.backgroundElevated, borderColor: colors.border }]}>
              {ACCOUNTS.filter(acc => acc.id !== toAccount).map((account) => (
                <Pressable
                  key={account.id}
                  style={[
                    styles.dropdownItem,
                    fromAccount === account.id && { backgroundColor: '#E3F2FD' },
                  ]}
                  onPress={() => selectFromAccount(account.id)}>
                  <View style={styles.pickerLeft}>
                    <View style={[styles.iconCircleSmall, { backgroundColor: '#007AFF' }]}>
                      <Ionicons name={account.icon as any} size={16} color="#FFFFFF" />
                    </View>
                    <View>
                      <Text style={[styles.dropdownText, { color: colors.text }]}>
                        {account.name}
                      </Text>
                      <Text style={[styles.balanceTextSmall, { color: colors.textSecondary }]}>
                        {account.balance}
                      </Text>
                    </View>
                  </View>
                  {fromAccount === account.id && (
                    <Ionicons name="checkmark" size={20} color="#007AFF" />
                  )}
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Swap Button */}
        <View style={styles.swapContainer}>
          <Pressable 
            style={[styles.swapButton, { backgroundColor: colors.backgroundElevated }]}
            onPress={swapAccounts}>
            <Ionicons name="swap-vertical" size={24} color={colors.primary} />
          </Pressable>
        </View>

        {/* To Account Picker */}
        <View style={[styles.field, { backgroundColor: colors.backgroundElevated }]}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>To Account</Text>
          <Pressable 
            style={styles.picker}
            onPress={() => {
              setShowToPicker(!showToPicker);
              setShowFromPicker(false);
            }}>
            <View style={styles.pickerLeft}>
              <View style={[styles.iconCircle, { backgroundColor: '#007AFF' }]}>
                <Ionicons name={selectedTo?.icon as any} size={20} color="#FFFFFF" />
              </View>
              <View>
                <Text style={[styles.pickerText, { color: colors.text }]}>
                  {selectedTo?.name}
                </Text>
                <Text style={[styles.balanceText, { color: colors.textSecondary }]}>
                  {selectedTo?.balance}
                </Text>
              </View>
            </View>
            <Ionicons 
              name={showToPicker ? "chevron-up" : "chevron-down"} 
              size={20} 
              color={colors.textSecondary} 
            />
          </Pressable>

          {/* To Account Dropdown */}
          {showToPicker && (
            <View style={[styles.dropdown, { backgroundColor: colors.backgroundElevated, borderColor: colors.border }]}>
              {ACCOUNTS.filter(acc => acc.id !== fromAccount).map((account) => (
                <Pressable
                  key={account.id}
                  style={[
                    styles.dropdownItem,
                    toAccount === account.id && { backgroundColor: '#E3F2FD' },
                  ]}
                  onPress={() => selectToAccount(account.id)}>
                  <View style={styles.pickerLeft}>
                    <View style={[styles.iconCircleSmall, { backgroundColor: '#007AFF' }]}>
                      <Ionicons name={account.icon as any} size={16} color="#FFFFFF" />
                    </View>
                    <View>
                      <Text style={[styles.dropdownText, { color: colors.text }]}>
                        {account.name}
                      </Text>
                      <Text style={[styles.balanceTextSmall, { color: colors.textSecondary }]}>
                        {account.balance}
                      </Text>
                    </View>
                  </View>
                  {toAccount === account.id && (
                    <Ionicons name="checkmark" size={20} color="#007AFF" />
                  )}
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Date Field */}
        <View style={[styles.field, { backgroundColor: colors.backgroundElevated }]}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Date</Text>
          <View style={styles.picker}>
            <TextInput
              style={[styles.dateInput, { color: colors.text }]}
              value={date}
              onChangeText={setDate}
              placeholder="Select date"
              placeholderTextColor={colors.textSecondary}
            />
            <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />
          </View>
        </View>

        {/* Notes Field */}
        <View style={[styles.field, { backgroundColor: colors.backgroundElevated }]}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Notes (Optional)</Text>
          <TextInput
            style={[styles.notesInput, { color: colors.text }]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Add a note..."
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={3}
          />
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={[styles.footer, { backgroundColor: colors.background }]}>
        <Button 
          title="Transfer Funds" 
          onPress={handleSave} 
          style={[styles.saveButton, { backgroundColor: '#007AFF' }]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    gap: 16,
  },
  field: {
    borderRadius: 8,
    padding: 20,
  },
  fieldLabel: {
    fontSize: 13,
    marginBottom: 12,
    fontWeight: '500',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currency: {
    fontSize: 28,
    fontWeight: '700',
    marginRight: 8,
  },
  amountInput: {
    fontSize: 28,
    fontWeight: '700',
    flex: 1,
    padding: 0,
  },
  swapContainer: {
    alignItems: 'center',
    marginVertical: -8,
    zIndex: 10,
  },
  swapButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  picker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircleSmall: {
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  balanceText: {
    fontSize: 12,
    marginTop: 2,
  },
  balanceTextSmall: {
    fontSize: 11,
    marginTop: 2,
  },
  dateInput: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    padding: 0,
  },
  notesInput: {
    fontSize: 16,
    padding: 0,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  dropdown: {
    marginTop: 12,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 15,
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    paddingBottom: 32,
    borderTopWidth: 0,
  },
  saveButton: {
    width: '100%',
  },
});
