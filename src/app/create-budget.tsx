import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

const EXPENSE_CATEGORIES = [
  { id: 'food', name: 'Food & Dining', icon: 'restaurant', color: '#FF9500' },
  { id: 'transport', name: 'Transportation', icon: 'car', color: '#5856D6' },
  { id: 'shopping', name: 'Shopping', icon: 'cart', color: '#FF2D55' },
  { id: 'bills', name: 'Bills & Utilities', icon: 'receipt', color: '#FF3B30' },
  { id: 'entertainment', name: 'Entertainment', icon: 'game-controller', color: '#AF52DE' },
  { id: 'health', name: 'Health & Fitness', icon: 'fitness', color: '#34C759' },
  { id: 'education', name: 'Education', icon: 'school', color: '#007AFF' },
  { id: 'other', name: 'Other', icon: 'ellipsis-horizontal', color: '#8E8E93' },
];

interface CategoryBudget {
  id: string;
  name: string;
  icon: string;
  color: string;
  allocated: number;
  spent: number;
}

export default function CreateBudgetScreen() {
  const router = useRouter();
  const colors = Colors.light;
  const { addBudget, budgets, user, updateBudget } = useApp();

  const currentMonth = new Date().toISOString().slice(0, 7);
  
  // State for selected month (default to current month)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const existingBudget = budgets.find(b => b.month === selectedMonth);

  const [step, setStep] = useState(1);
  const [monthlyIncome, setMonthlyIncome] = useState(
    existingBudget?.monthlyIncome.toString() || ''
  );
  const [categories, setCategories] = useState<CategoryBudget[]>(
    existingBudget?.categories || []
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryAmount, setCategoryAmount] = useState('');
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  
  // Generate month options (current month + 11 future months)
  const generateMonthOptions = () => {
    const options = [];
    const today = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
      const monthStr = date.toISOString().slice(0, 7);
      const label = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      options.push({ value: monthStr, label });
    }
    return options;
  };
  
  const monthOptions = generateMonthOptions();
  const selectedMonthLabel = monthOptions.find(m => m.value === selectedMonth)?.label || '';
  
  // Update budget data when selected month changes
  useEffect(() => {
    const budgetForMonth = budgets.find(b => b.month === selectedMonth);
    if (budgetForMonth) {
      setMonthlyIncome(budgetForMonth.monthlyIncome.toString());
      setCategories(budgetForMonth.categories);
    }
  }, [selectedMonth, budgets]);
  
  // Update existing budget check when month changes
  const handleMonthChange = (month: string) => {
    const budgetForMonth = budgets.find(b => b.month === month);
    setSelectedMonth(month);
    if (budgetForMonth) {
      setMonthlyIncome(budgetForMonth.monthlyIncome.toString());
      setCategories(budgetForMonth.categories);
    } else {
      setMonthlyIncome('');
      setCategories([]);
    }
    setShowMonthPicker(false);
  };

  const getCurrencySymbol = () => {
    switch (user?.currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'NGN':
      default: return '₦';
    }
  };

  const totalAllocated = categories.reduce((sum, cat) => sum + cat.allocated, 0);
  const remaining = parseFloat(monthlyIncome || '0') - totalAllocated;

  const handleNextStep = () => {
    if (step === 1) {
      const income = parseFloat(monthlyIncome);
      if (!monthlyIncome || isNaN(income) || income <= 0) {
        Alert.alert('Invalid Income', 'Please enter your monthly income');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (categories.length === 0) {
        Alert.alert('No Categories', 'Please add at least one budget category');
        return;
      }
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const handleAddCategory = () => {
    if (!selectedCategory) {
      Alert.alert('Select Category', 'Please select a category');
      return;
    }
    
    const amount = parseFloat(categoryAmount);
    if (!categoryAmount || isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    const categoryData = EXPENSE_CATEGORIES.find(c => c.id === selectedCategory);
    if (!categoryData) return;

    // Check if category already exists
    const existingIndex = categories.findIndex(c => c.name === categoryData.name);
    if (existingIndex >= 0) {
      // Update existing category
      const updated = [...categories];
      updated[existingIndex] = {
        ...updated[existingIndex],
        allocated: amount,
      };
      setCategories(updated);
    } else {
      // Add new category
      const newCategory: CategoryBudget = {
        id: Date.now().toString(),
        name: categoryData.name,
        icon: categoryData.icon,
        color: categoryData.color,
        allocated: amount,
        spent: 0,
      };
      setCategories([...categories, newCategory]);
    }

    setSelectedCategory(null);
    setCategoryAmount('');
  };

  const handleRemoveCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const handleSave = () => {
    if (categories.length === 0) {
      Alert.alert('No Categories', 'Please add at least one budget category');
      return;
    }

    const income = parseFloat(monthlyIncome);
    
    if (existingBudget) {
      // Update existing budget
      updateBudget(existingBudget.id, {
        monthlyIncome: income,
        categories: categories,
      });
      Alert.alert('Success', 'Budget updated successfully!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)/budgets') },
      ]);
    } else {
      // Create new budget
      addBudget({
        userId: user?.id || 'local',
        monthlyIncome: income,
        categories: categories,
        month: selectedMonth,
      });
      Alert.alert('Success', 'Budget created successfully!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)/budgets') },
      ]);
    }
  };
  
  const renderMonthPicker = () => (
    <View style={[styles.monthPickerModal, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
      <Pressable style={styles.monthPickerBackdrop} onPress={() => setShowMonthPicker(false)} />
      <View style={[styles.monthPickerContent, { backgroundColor: colors.backgroundElevated }]}>
        <View style={styles.monthPickerHeader}>
          <Text style={[styles.monthPickerTitle, { color: colors.text }]}>
            Select Budget Month
          </Text>
          <Pressable onPress={() => setShowMonthPicker(false)}>
            <Ionicons name="close" size={24} color={colors.text} />
          </Pressable>
        </View>
        <ScrollView style={styles.monthPickerList}>
          {monthOptions.map((option) => {
            const hasExistingBudget = budgets.some(b => b.month === option.value);
            return (
              <Pressable
                key={option.value}
                style={[
                  styles.monthOption,
                  { 
                    backgroundColor: selectedMonth === option.value ? colors.primary : 'transparent',
                    borderBottomColor: colors.border,
                  }
                ]}
                onPress={() => handleMonthChange(option.value)}>
                <View style={styles.monthOptionLeft}>
                  <Text style={[
                    styles.monthOptionText,
                    { color: selectedMonth === option.value ? '#FFFFFF' : colors.text }
                  ]}>
                    {option.label}
                  </Text>
                  {hasExistingBudget && (
                    <View style={[styles.existingBadge, { backgroundColor: selectedMonth === option.value ? 'rgba(255,255,255,0.3)' : '#E8F5E9' }]}>
                      <Text style={[
                        styles.existingBadgeText,
                        { color: selectedMonth === option.value ? '#FFFFFF' : '#34C759' }
                      ]}>
                        Exists
                      </Text>
                    </View>
                  )}
                </View>
                {selectedMonth === option.value && (
                  <Ionicons name="checkmark" size={24} color="#FFFFFF" />
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <Text style={[styles.stepTitle, { color: colors.text }]}>
          Budget Setup
        </Text>
        <Text style={[styles.stepDescription, { color: colors.textSecondary }]}>
          Select the month and enter your monthly income
        </Text>
      </View>
      
      {/* Month Selector */}
      <View style={[styles.inputCard, { backgroundColor: colors.backgroundElevated }]}>
        <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
          Budget Month
        </Text>
        <Pressable
          onPress={() => setShowMonthPicker(true)}
          style={[styles.monthSelector, { borderColor: colors.border }]}>
          <View style={styles.monthSelectorLeft}>
            <Ionicons name="calendar-outline" size={20} color={colors.text} />
            <Text style={[styles.monthSelectorText, { color: colors.text }]}>
              {selectedMonthLabel}
            </Text>
          </View>
          <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
        </Pressable>
        {existingBudget && (
          <View style={[styles.warningCard, { backgroundColor: '#FFF4E6' }]}>
            <Ionicons name="information-circle" size={16} color="#FF9500" />
            <Text style={[styles.tipText, { color: '#FF9500', fontSize: 12 }]}>
              A budget already exists for this month. Saving will update it.
            </Text>
          </View>
        )}
      </View>

      <View style={[styles.inputCard, { backgroundColor: colors.backgroundElevated }]}>
        <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
          Monthly Income
        </Text>
        <View style={styles.amountContainer}>
          <Text style={[styles.currency, { color: colors.text }]}>
            {getCurrencySymbol()}
          </Text>
          <TextInput
            style={[styles.amountInput, { color: colors.text }]}
            value={monthlyIncome}
            onChangeText={setMonthlyIncome}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={colors.textSecondary}
            autoFocus={false}
          />
        </View>
      </View>

      <View style={[styles.tipCard, { backgroundColor: '#E8F5E9' }]}>
        <Ionicons name="bulb" size={20} color="#34C759" />
        <Text style={[styles.tipText, { color: '#34C759' }]}>
          Include all sources: salary, freelance, investments, etc.
        </Text>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <Text style={[styles.stepTitle, { color: colors.text }]}>
          Budget Categories
        </Text>
        <Text style={[styles.stepDescription, { color: colors.textSecondary }]}>
          Allocate your income across different spending categories
        </Text>
      </View>

      {/* Add Category Form */}
      <View style={[styles.inputCard, { backgroundColor: colors.backgroundElevated }]}>
        <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
          Select Category
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryScrollContent}>
          {EXPENSE_CATEGORIES.map((cat) => (
            <Pressable
              key={cat.id}
              style={[
                styles.categoryChip,
                { 
                  backgroundColor: selectedCategory === cat.id ? cat.color : colors.border,
                  borderColor: selectedCategory === cat.id ? cat.color : colors.border,
                }
              ]}
              onPress={() => setSelectedCategory(cat.id)}>
              <Ionicons 
                name={cat.icon as any} 
                size={16} 
                color={selectedCategory === cat.id ? '#FFFFFF' : colors.textSecondary} 
              />
              <Text 
                style={[
                  styles.categoryChipText, 
                  { color: selectedCategory === cat.id ? '#FFFFFF' : colors.textSecondary }
                ]}>
                {cat.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.amountRow}>
          <View style={[styles.amountInputWrapper, { flex: 1 }]}>
            <Text style={[styles.currency, { color: colors.text }]}>
              {getCurrencySymbol()}
            </Text>
            <TextInput
              style={[styles.amountInput, { color: colors.text }]}
              value={categoryAmount}
              onChangeText={setCategoryAmount}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          <Button
            title="Add"
            onPress={handleAddCategory}
            style={styles.addCategoryButton}
          />
        </View>
      </View>

      {/* Summary */}
      <View style={[styles.summaryCard, { backgroundColor: colors.backgroundElevated }]}>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Monthly Income
          </Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            {getCurrencySymbol()}{parseFloat(monthlyIncome || '0').toLocaleString()}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Allocated
          </Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            {getCurrencySymbol()}{totalAllocated.toLocaleString()}
          </Text>
        </View>
        <View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.text }]}>
            Remaining
          </Text>
          <Text 
            style={[
              styles.summaryValue, 
              { color: remaining >= 0 ? '#34C759' : '#FF3B30', fontWeight: '700' }
            ]}>
            {getCurrencySymbol()}{remaining.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Category List */}
      {categories.length > 0 && (
        <View style={styles.categoryList}>
          <Text style={[styles.listTitle, { color: colors.text }]}>
            Allocated Categories ({categories.length})
          </Text>
          {categories.map((cat) => (
            <View 
              key={cat.id} 
              style={[styles.categoryItem, { backgroundColor: colors.backgroundElevated }]}>
              <View style={styles.categoryItemLeft}>
                <View style={[styles.categoryIcon, { backgroundColor: cat.color }]}>
                  <Ionicons name={cat.icon as any} size={20} color="#FFFFFF" />
                </View>
                <View>
                  <Text style={[styles.categoryItemName, { color: colors.text }]}>
                    {cat.name}
                  </Text>
                  <Text style={[styles.categoryItemAmount, { color: colors.textSecondary }]}>
                    {getCurrencySymbol()}{cat.allocated.toLocaleString()}
                  </Text>
                </View>
              </View>
              <Pressable 
                onPress={() => handleRemoveCategory(cat.id)}
                style={styles.removeButton}>
                <Ionicons name="close-circle" size={24} color="#FF3B30" />
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <Text style={[styles.stepTitle, { color: colors.text }]}>
          Review Budget
        </Text>
        <Text style={[styles.stepDescription, { color: colors.textSecondary }]}>
          Review your budget before saving
        </Text>
      </View>

      {/* Overview */}
      <View style={[styles.reviewCard, { backgroundColor: colors.backgroundElevated }]}>
        <View style={styles.reviewRow}>
          <Text style={[styles.reviewLabel, { color: colors.textSecondary }]}>
            Monthly Income
          </Text>
          <Text style={[styles.reviewValue, { color: colors.text }]}>
            {getCurrencySymbol()}{parseFloat(monthlyIncome || '0').toLocaleString()}
          </Text>
        </View>
        <View style={styles.reviewRow}>
          <Text style={[styles.reviewLabel, { color: colors.textSecondary }]}>
            Total Allocated
          </Text>
          <Text style={[styles.reviewValue, { color: colors.text }]}>
            {getCurrencySymbol()}{totalAllocated.toLocaleString()}
          </Text>
        </View>
        <View style={styles.reviewRow}>
          <Text style={[styles.reviewLabel, { color: colors.textSecondary }]}>
            Unallocated
          </Text>
          <Text 
            style={[
              styles.reviewValue, 
              { color: remaining >= 0 ? '#34C759' : '#FF3B30', fontWeight: '700' }
            ]}>
            {getCurrencySymbol()}{remaining.toLocaleString()}
          </Text>
        </View>
        <View style={styles.reviewRow}>
          <Text style={[styles.reviewLabel, { color: colors.textSecondary }]}>
            Categories
          </Text>
          <Text style={[styles.reviewValue, { color: colors.text }]}>
            {categories.length}
          </Text>
        </View>
      </View>

      {/* Category Breakdown */}
      <View style={styles.categoryList}>
        <Text style={[styles.listTitle, { color: colors.text }]}>
          Budget Breakdown
        </Text>
        {categories.map((cat) => {
          const percentage = totalAllocated > 0 
            ? ((cat.allocated / totalAllocated) * 100).toFixed(0) 
            : 0;
          return (
            <View 
              key={cat.id} 
              style={[styles.reviewCategoryItem, { backgroundColor: colors.backgroundElevated }]}>
              <View style={styles.reviewCategoryLeft}>
                <View style={[styles.categoryIcon, { backgroundColor: cat.color }]}>
                  <Ionicons name={cat.icon as any} size={20} color="#FFFFFF" />
                </View>
                <Text style={[styles.reviewCategoryName, { color: colors.text }]}>
                  {cat.name}
                </Text>
              </View>
              <View style={styles.reviewCategoryRight}>
                <Text style={[styles.reviewCategoryAmount, { color: colors.text }]}>
                  {getCurrencySymbol()}{cat.allocated.toLocaleString()}
                </Text>
                <Text style={[styles.reviewCategoryPercent, { color: colors.textSecondary }]}>
                  {percentage}%
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {remaining !== 0 && (
        <View 
          style={[
            styles.tipCard, 
            { backgroundColor: remaining > 0 ? '#FFF4E6' : '#FFE8E6' }
          ]}>
          <Ionicons 
            name={remaining > 0 ? "information-circle" : "warning"} 
            size={20} 
            color={remaining > 0 ? '#FF9500' : '#FF3B30'} 
          />
          <Text 
            style={[
              styles.warningText, 
              { color: remaining > 0 ? '#FF9500' : '#FF3B30' }
            ]}>
            {remaining > 0 
              ? `You have ${getCurrencySymbol()}${remaining.toLocaleString()} unallocated` 
              : `You're over budget by ${getCurrencySymbol()}${Math.abs(remaining).toLocaleString()}`}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Pressable onPress={handlePrevStep} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>
          {existingBudget ? 'Edit Budget' : 'Create Budget'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        {[1, 2, 3].map((num) => (
          <View key={num} style={styles.stepIndicatorItem}>
            <View 
              style={[
                styles.stepDot,
                { 
                  backgroundColor: step >= num ? colors.primary : colors.border,
                }
              ]} 
            />
            {num < 3 && (
              <View 
                style={[
                  styles.stepLine,
                  { backgroundColor: step > num ? colors.primary : colors.border }
                ]} 
              />
            )}
          </View>
        ))}
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { backgroundColor: colors.background }]}>
        {step < 3 ? (
          <Button
            title={step === 2 && categories.length > 0 ? 'Review' : 'Continue'}
            onPress={handleNextStep}
            style={styles.footerButton}
          />
        ) : (
          <Button
            title="Save Budget"
            onPress={handleSave}
            style={styles.footerButton}
          />
        )}
      </View>
      
      {/* Month Picker Modal */}
      {showMonthPicker && renderMonthPicker()}
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
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  stepIndicatorItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  stepLine: {
    width: 40,
    height: 2,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  stepContent: {
    gap: 16,
  },
  stepHeader: {
    marginBottom: 8,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 15,
    lineHeight: 22,
  },
  inputCard: {
    borderRadius: 12,
    padding: 20,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 12,
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
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  categoryScroll: {
    marginBottom: 16,
  },
  categoryScrollContent: {
    gap: 8,
    paddingRight: 20,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '500',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  amountInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addCategoryButton: {
    paddingHorizontal: 24,
  },
  summaryCard: {
    borderRadius: 12,
    padding: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 15,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    marginVertical: 8,
  },
  categoryList: {
    gap: 8,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  categoryItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItemName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryItemAmount: {
    fontSize: 13,
  },
  removeButton: {
    padding: 4,
  },
  reviewCard: {
    borderRadius: 12,
    padding: 20,
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  reviewLabel: {
    fontSize: 15,
  },
  reviewValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  reviewCategoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  reviewCategoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  reviewCategoryName: {
    fontSize: 15,
    fontWeight: '600',
  },
  reviewCategoryRight: {
    alignItems: 'flex-end',
  },
  reviewCategoryAmount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  reviewCategoryPercent: {
    fontSize: 12,
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    paddingBottom: 32,
    borderTopWidth: 0,
  },
  footerButton: {
    width: '100%',
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  monthSelectorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  monthSelectorText: {
    fontSize: 16,
    fontWeight: '600',
  },
  monthPickerModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  monthPickerBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  monthPickerContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    maxHeight: '70%',
  },
  monthPickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  monthPickerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  monthPickerList: {
    maxHeight: 400,
  },
  monthOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  monthOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  monthOptionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  existingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  existingBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
  },
});
