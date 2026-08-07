import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AddScreen() {
  const router = useRouter();
  const colors = Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Quick Add</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Pressable
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/add-expense')}>
          <Ionicons name="remove-circle-outline" size={48} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Expense</Text>
          <Text style={styles.addButtonSubtext}>Track your spending</Text>
        </Pressable>

        <Pressable
          style={[styles.addButton, { backgroundColor: '#34C759' }]}
          onPress={() => router.push('/add-income')}>
          <Ionicons name="add-circle-outline" size={48} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Income</Text>
          <Text style={styles.addButtonSubtext}>Record earnings</Text>
        </Pressable>

        <Pressable
          style={[styles.addButton, { backgroundColor: '#007AFF' }]}
          onPress={() => router.push('/transfer')}>
          <Ionicons name="swap-horizontal-outline" size={48} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Transfer</Text>
          <Text style={styles.addButtonSubtext}>Between accounts</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 100,
    gap: 16,
  },
  addButton: {
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
  },
  addButtonSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
