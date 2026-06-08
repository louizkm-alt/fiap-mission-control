import { Tabs } from 'expo-router';
import React from 'react';

import { theme } from '../../constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.cyan,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: {
          backgroundColor: '#020617',
          borderTopColor: 'rgba(148, 163, 184, 0.22)',
          height: 66,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen name="dashboard" options={{ title: 'Dashboard' }} />
      <Tabs.Screen name="mission" options={{ title: 'Missão' }} />
      <Tabs.Screen name="update" options={{ title: 'Atualizar' }} />
      <Tabs.Screen name="settings" options={{ title: 'Config' }} />
    </Tabs>
  );
}
