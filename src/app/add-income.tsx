import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

const INCOME_CATEGORIES = [
  { id: 'salary', name: 'Salary', icon: 'briefcase' },
  { id: 'freelance', name: 'Freelance', icon: 'laptop' },
  { id: 'business', name: 'Business', icon: 'storefront' },
  { id: 'investment', name: 'Investment', icon: 'trending-up' },
  { id: 'gift', name: 'Gift', icon: 'gift' },
  { id: 'other', name: 'Other', icon: 'ellipsis-horizontal' },
];

const PAYMENT_METHODS = [
  { id: 'gtbank', name: 'GTBank •••• 5678', icon: 'card' },
  { id: 'cash', name: 'Cash', icon: 'cash' },
  { id: 'zenith', name: 'Zenith Bank •••• 1234', icon: 'card' },
  { id: 'access', name: 'Access Bank •••• 9012', icon: 'card' },
];

export default function AddIncomeScreen() {
  const router = useRouter();
  const colors = Colors.light;
  const { addTransaction } = useApp();

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('salary');
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }));
  const [paymentMethod, setPaymentMethod] = useState('gtbank');
  const [notes, setNotes] = useState('');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showPaymentPicker, setShowPaymentPicker] = useState(false);

  const selectedCategory = INCOME_CATEGORIES.find(c => c.id === category);
  const selectedPayment = PAYMENT_METHODS.find(p => p.id === paymentMethod);

  const handleSave = () => {
    // Validate amount
    const numAmount = parseFloat(amount.replace(/,/g, ''));
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    // Save transaction
    addTransaction({
      type: 'income',
      amount: numAmount,
      category: selectedCategory?.name || 'Other',
      date: new Date().toISOString(),
      notes,
      paymentMethod: selectedPayment?.name || 'Cash',
    });

    Alert.alert('Success', 'Income added successfully!');
    router.back();
  };

  const selectCategory = (categoryId: string) => {
    setCategory(categoryId);
    setShowCategoryPicker(false);
  };

  const selectPaymentMethod = (methodId: string) => {
    setPaymentMethod(methodId);
    setShowPaymentPicker(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Add Income</Text>
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

        {/* Category Picker */}
        <View style={[styles.field, { backgroundColor: colors.backgroundElevated }]}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Category</Text>
          <Pressable 
            style={styles.picker}
            onPress={() => {
              setShowCategoryPicker(!showCategoryPicker);
              setShowPaymentPicker(false);
            }}>
            <View style={styles.pickerLeft}>
              <View style={[styles.iconCircle, { backgroundColor: '#34C759' }]}>
                <Ionicons name={selectedCategory?.icon as any} size={20} color="#FFFFFF" />
              </View>
              <Text style={[styles.pickerText, { color: colors.text }]}>
                {selectedCategory?.name}
              </Text>
            </View>
            <Ionicons 
              name={showCategoryPicker ? "chevron-up" : "chevron-down"} 
              size={20} 
              color={colors.textSecondary} 
            />
          </Pressable>

          {/* Category Dropdown */}
          {showCategoryPicker && (
            <View style={[styles.dropdown, { backgroundColor: colors.backgroundElevated, borderColor: colors.border }]}>
              {INCOME_CATEGORIES.map((cat) => (
                <Pressable
                  key={cat.id}
                  style={[
                    styles.dropdownItem,
                    category === cat.id && { backgroundColor: '#E8F5E9' },
                  ]}
                  onPress={() => selectCategory(cat.id)}>
                  <View style={styles.pickerLeft}>
                    <View style={[styles.iconCircleSmall, { backgroundColor: '#34C759' }]}>
                      <Ionicons name={cat.icon as any} size={16} color="#FFFFFF" />
                    </View>
                    <Text style={[styles.dropdownText, { color: colors.text }]}>
                      {cat.name}
                    </Text>
                  </View>
                  {category === cat.id && (
                    <Ionicons name="checkmark" size={20} color="#34C759" />
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

        {/* Payment Method Picker */}
        <View style={[styles.field, { backgroundColor: colors.backgroundElevated }]}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Received In</Text>
          <Pressable 
            style={styles.picker}
            onPress={() => {
              setShowPaymentPicker(!showPaymentPicker);
              setShowCategoryPicker(false);
            }}>
            <View style={styles.pickerLeft}>
              <View style={[styles.iconCircle, { backgroundColor: '#34C759' }]}>
                <Ionicons name={selectedPayment?.icon as any} size={20} color="#FFFFFF" />
              </View>
              <Text style={[styles.pickerText, { color: colors.text }]}>
                {selectedPayment?.name}
              </Text>
            </View>
            <Ionicons 
              name={showPaymentPicker ? "chevron-up" : "chevron-down"} 
              size={20} 
              color={colors.textSecondary} 
            />
          </Pressable>

          {/* Payment Method Dropdown */}
          {showPaymentPicker && (
            <View style={[styles.dropdown, { backgroundColor: colors.backgroundElevated, borderColor: colors.border }]}>
              {PAYMENT_METHODS.map((method) => (
                <Pressable
                  key={method.id}
                  style={[
                    styles.dropdownItem,
                    paymentMethod === method.id && { backgroundColor: '#E8F5E9' },
                  ]}
                  onPress={() => selectPaymentMethod(method.id)}>
                  <View style={styles.pickerLeft}>
                    <View style={[styles.iconCircleSmall, { backgroundColor: '#34C759' }]}>
                      <Ionicons name={method.icon as any} size={16} color="#FFFFFF" />
                    </View>
                    <Text style={[styles.dropdownText, { color: colors.text }]}>
                      {method.name}
                    </Text>
                  </View>
                  {paymentMethod === method.id && (
                    <Ionicons name="checkmark" size={20} color="#34C759" />
                  )}
                </Pressable>
              ))}
            </View>
          )}
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
          title="Save Income" 
          onPress={handleSave} 
          style={[styles.saveButton, { backgroundColor: '#34C759' }]} 
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
