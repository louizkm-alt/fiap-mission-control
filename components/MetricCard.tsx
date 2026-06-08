import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../constants/theme';
import { GlassCard } from './GlassCard';

interface MetricCardProps {
  label: string;
  value: string;
  detail: string;
  progress?: number;
  status?: 'ok' | 'warning' | 'critical';
}

export function MetricCard({ label, value, detail, progress, status = 'ok' }: MetricCardProps) {
  const statusColor = status === 'critical' ? theme.colors.red : status === 'warning' ? theme.colors.yellow : theme.colors.green;

  return (
    <View style={styles.wrapper}>
      <GlassCard compact>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.row}>
          <Text style={styles.value}>{value}</Text>
          <View style={[styles.dot, { backgroundColor: statusColor }]} />
        </View>
        <Text style={styles.detail}>{detail}</Text>

        {typeof progress === 'number' ? (
          <View style={styles.track}>
            <View style={[styles.progress, { width: `${Math.max(0, Math.min(100, progress))}%`, backgroundColor: statusColor }]} />
          </View>
        ) : null}
      </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '48%',
    marginBottom: theme.spacing.sm,
  },
  label: {
    color: theme.colors.muted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  value: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  detail: {
    color: theme.colors.muted,
    fontSize: 12,
    marginTop: 4,
  },
  dot: {
    borderRadius: 99,
    height: 10,
    width: 10,
  },
  track: {
    backgroundColor: 'rgba(148, 163, 184, 0.18)',
    borderRadius: 99,
    height: 7,
    marginTop: 12,
    overflow: 'hidden',
  },
  progress: {
    borderRadius: 99,
    height: 7,
  },
});
