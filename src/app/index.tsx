import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useApp } from '@/context/AppContext';

export default function Index() {
  const { user, isAuthenticated, isLoading } = useApp();
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setInitialCheckDone(true);
    }
  }, [isLoading]);

  // Show loading while checking authentication state
  if (!initialCheckDone || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' }}>
        <ActivityIndicator size="large" color="#FD7E15" />
      </View>
    );
  }

  // Not authenticated → Show splash → Welcome
  if (!isAuthenticated || !user) {
    return <Redirect href="/splash" />;
  }

  // Authenticated but onboarding not completed → Resume onboarding
  if (!user.hasCompletedOnboarding) {
    // Determine where to resume based on what's missing
    if (!user.currency) {
      return <Redirect href="/(auth)/choose-currency" />;
    }
    return <Redirect href="/(auth)/success" />;
  }

  // Authenticated and onboarding complete → Dashboard
  return <Redirect href="/(tabs)" />;
}