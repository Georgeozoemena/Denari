import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Elevation, Radius } from '@/constants/theme';


function TabPillIcon({
  focused,
  name,
  activeName,
}: {
  focused: boolean;
  name: keyof typeof Ionicons.glyphMap;
  activeName: keyof typeof Ionicons.glyphMap;
}) {
  const colors = Colors.light;
  return (
    <View style={[styles.tabPill, focused && { backgroundColor: colors.navy }]}>
      <Ionicons name={focused ? activeName : name} size={20} color={focused ? colors.primary : colors.textTertiary} />
    </View>
  );
}

export default function TabLayout() {
  const colors = Colors.light;
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.navy,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarLabelStyle: {
          fontFamily: 'Sora_500Medium',
          fontSize: 11,
          lineHeight: 14,
          marginTop: 2,
        },

        tabBarStyle: {
          marginHorizontal: 24,
          marginBottom: 8,
          height: 78 + insets.bottom,
          paddingTop: 8,
          paddingBottom: 10 + insets.bottom,
          borderRadius: Radius.full,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.04)',
          ...Elevation.card,
        },
        tabBarItemStyle: {
          paddingTop: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabPillIcon focused={focused} name="home-outline" activeName="home" />,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Activity',
          tabBarIcon: ({ focused }) => (
            <TabPillIcon focused={focused} name="receipt-outline" activeName="receipt" />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',

          tabBarIcon: () => (
            <View style={[styles.fab, { backgroundColor: colors.primary }, Elevation.raised]}>
              <Ionicons name="add" size={24} color={colors.navy} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="budgets"
        options={{
          title: 'Budgets',
          tabBarIcon: ({ focused }) => (
            <TabPillIcon focused={focused} name="wallet-outline" activeName="wallet" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabPillIcon focused={focused} name="person-outline" activeName="person" />
          ),
        }}
      />

      <Tabs.Screen
        name="savings"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabPill: {
    width: 46,
    height: 30,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    width: 46,
    height: 46,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -22,
  },
});