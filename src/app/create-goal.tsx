import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

const GOAL_ICONS = [
  { id: 'home', icon: 'home', label: 'House', color: '#007AFF' },
  { id: 'car', icon: 'car', label: 'Car', color: '#5856D6' },
  { id: 'airplane', icon: 'airplane', label: 'Travel', color: '#FF2D55' },
  { id: 'desktop', icon: 'desktop', label: 'Computer', color: '#8E8E93' },
  { id: 'school', icon: 'school', label: 'Education', color: '#34C759' },
  { id: 'heart', icon: 'heart', label: 'Wedding', color: '#FF3B30' },
  { id: 'gift', icon: 'gift', label: 'Gift', color: '#FF9500' },
  { id: 'flash', icon: 'flash', label: 'Emergency', color: '#FFCC00' },
  { id: 'diamond', icon: 'diamond', label: 'Luxury', color: '#AF52DE' },
  { id: 'phone-portrait', icon: 'phone-portrait', label: 'Phone', color: '#007AFF' },
  { id: 'camera', icon: 'camera', label: 'Camera', color: '#8E8E93' },
  { id: 'trophy', icon: 'trophy', label: 'Goal', color: '#FFCC00' },
];

export default function CreateGoalScreen() {
  const router = useRouter();
  const colors = Colors.light;
  const { addSavingsGoal, user } = useApp();

  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(GOAL_ICONS[0]);
  const [showIconPicker, setShowIconPicker] = useState(false);

  const getCurrencySymbol = () => {
    switch (user?.currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'NGN':
      default: return '₦';
    }
  };

  const handleSave = () => {
    // Validate goal name
    if (!goalName.trim()) {
      Alert.alert('Invalid Name', 'Please enter a goal name');
      return;
    }

    // Validate target amount
    const amount = parseFloat(targetAmount.replace(/,/g, ''));
    if (!targetAmount || isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid target amount');
      return;
    }

    // Validate deadline
    if (!deadline) {
      Alert.alert('Invalid Date', 'Please enter a deadline');
      return;
    }

    const deadlineDate = new Date(deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (isNaN(deadlineDate.getTime())) {
      Alert.alert('Invalid Date', 'Please enter a valid date in YYYY-MM-DD format');
      return;
    }

    if (deadlineDate < today) {
      Alert.alert('Invalid Date', 'Deadline must be in the future');
      return;
    }

    try {
      addSavingsGoal({
        userId: user?.id || 'local',
        name: goalName.trim(),
        targetAmount: amount,
        currentAmount: 0,
        deadline: deadlineDate.toISOString(),
        icon: selectedIcon.icon,
        color: selectedIcon.color,
        status: 'active',
      });

      Alert.alert('Success', 'Savings goal created successfully!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)/savings') },
      ]);
    } catch (error) {
      console.error('Error creating goal:', error);
      Alert.alert('Error', 'Failed to create goal. Please try again.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Create Savings Goal</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        
        {/* Icon Picker */}
        <View style={[styles.field, { backgroundColor: colors.backgroundElevated }]}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
            Choose Icon
          </Text>
          <Pressable 
            style={styles.iconButton}
            onPress={() => setShowIconPicker(!showIconPicker)}>
            <View style={[styles.selectedIconCircle, { backgroundColor: selectedIcon.color }]}>
              <Ionicons name={selectedIcon.icon as any} size={32} color="#FFFFFF" />
            </View>
            <Text style={[styles.selectedIconLabel, { color: colors.text }]}>
              {selectedIcon.label}
            </Text>
            <Ionicons 
              name={showIconPicker ? "chevron-up" : "chevron-down"} 
              size={20} 
              color={colors.textSecondary} 
            />
          </Pressable>

          {/* Icon Grid */}
          {showIconPicker && (
            <View style={styles.iconGrid}>
              {GOAL_ICONS.map((iconOption) => (
                <Pressable
                  key={iconOption.id}
                  style={[
                    styles.iconGridItem,
                    selectedIcon.id === iconOption.id && styles.iconGridItemSelected,
                  ]}
                  onPress={() => {
                    setSelectedIcon(iconOption);
                    setShowIconPicker(false);
                  }}>
                  <View style={[styles.iconCircle, { backgroundColor: iconOption.color }]}>
                    <Ionicons name={iconOption.icon as any} size={24} color="#FFFFFF" />
                  </View>
                  <Text style={[styles.iconLabel, { color: colors.text }]}>
                    {iconOption.label}
                  </Text>
                  {selectedIcon.id === iconOption.id && (
                    <View style={styles.checkmark}>
                      <Ionicons name="checkmark-circle" size={20} color="#34C759" />
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Goal Name */}
        <View style={[styles.field, { backgroundColor: colors.backgroundElevated }]}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
            Goal Name
          </Text>
          <TextInput
            style={[styles.textInput, { color: colors.text }]}
            value={goalName}
            onChangeText={setGoalName}
            placeholder="e.g., New Car, Dream Vacation"
            placeholderTextColor={colors.textSecondary}
            autoFocus
          />
        </View>

        {/* Target Amount */}
        <View style={[styles.field, { backgroundColor: colors.backgroundElevated }]}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
            Target Amount
          </Text>
          <View style={styles.amountContainer}>
            <Text style={[styles.currency, { color: colors.text }]}>
              {getCurrencySymbol()}
            </Text>
            <TextInput
              style={[styles.amountInput, { color: colors.text }]}
              value={targetAmount}
              onChangeText={setTargetAmount}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>

        {/* Deadline */}
        <View style={[styles.field, { backgroundColor: colors.backgroundElevated }]}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
            Deadline
          </Text>
          <View style={styles.dateContainer}>
            <TextInput
              style={[styles.dateInput, { color: colors.text }]}
              value={deadline}
              onChangeText={setDeadline}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={colors.textSecondary}
            />
            <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />
          </View>
          <Text style={[styles.hint, { color: colors.textSecondary }]}>
            Enter date in YYYY-MM-DD format (e.g., 2027-12-31)
          </Text>
        </View>

        {/* Preview Card */}
        <View style={[styles.previewCard, { backgroundColor: colors.backgroundElevated }]}>
          <Text style={[styles.previewLabel, { color: colors.textSecondary }]}>
            Preview
          </Text>
          <View style={styles.previewContent}>
            <View style={[styles.previewIcon, { backgroundColor: selectedIcon.color }]}>
              <Ionicons name={selectedIcon.icon as any} size={32} color="#FFFFFF" />
            </View>
            <View style={styles.previewInfo}>
              <Text style={[styles.previewName, { color: colors.text }]}>
                {goalName || 'Your Goal Name'}
              </Text>
              <Text style={[styles.previewAmount, { color: colors.textSecondary }]}>
                Target: {getCurrencySymbol()}{targetAmount || '0'}
              </Text>
              {deadline && (
                <Text style={[styles.previewDeadline, { color: colors.textSecondary }]}>
                  Due: {deadline}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Tips */}
        <View style={[styles.tipCard, { backgroundColor: '#E8F5E9' }]}>
          <Ionicons name="bulb" size={20} color="#34C759" />
          <View style={{ flex: 1 }}>
            <Text style={[styles.tipTitle, { color: '#34C759' }]}>Tips for Success</Text>
            <Text style={[styles.tipText, { color: '#34C759' }]}>• Set realistic and achievable targets{'\n'}• Break large goals into smaller milestones{'\n'}• Save consistently each month{'\n'}• Track your progress regularly</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { backgroundColor: colors.background }]}>
        <Button
          title="Create Goal"
          onPress={handleSave}
          style={styles.saveButton}
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
    borderRadius: 12,
    padding: 20,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 12,
  },
  textInput: {
    fontSize: 16,
    padding: 0,
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateInput: {
    fontSize: 16,
    flex: 1,
    padding: 0,
  },
  hint: {
    fontSize: 12,
    marginTop: 8,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  selectedIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIconLabel: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  iconGridItem: {
    width: '30%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  iconGridItemSelected: {
    borderColor: '#34C759',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  previewCard: {
    borderRadius: 12,
    padding: 20,
  },
  previewLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 16,
  },
  previewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  previewIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewInfo: {
    flex: 1,
  },
  previewName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  previewAmount: {
    fontSize: 14,
    marginBottom: 2,
  },
  previewDeadline: {
    fontSize: 14,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    borderRadius: 12,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    lineHeight: 20,
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
