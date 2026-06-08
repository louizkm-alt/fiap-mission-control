import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { theme } from '../constants/theme';
import { MissionProvider } from '../context/MissionContext';

export default function RootLayout() {
  return (
    <MissionProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerTitleStyle: { fontWeight: '800' },
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="alerts/[id]" options={{ title: 'Detalhe do Alerta' }} />
      </Stack>
    </MissionProvider>
  );
}
