import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../constants/theme';
import { MissionStatus } from '../types';

export function StatusPill({ status }: { status: MissionStatus }) {
  const color = status === 'CRÍTICO' ? theme.colors.red : status === 'ATENÇÃO' ? theme.colors.yellow : theme.colors.green;

  return (
    <View style={[styles.pill, { borderColor: color }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.text, { color }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 99,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  dot: {
    borderRadius: 99,
    height: 8,
    width: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
});
