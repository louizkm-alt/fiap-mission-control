import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { theme } from '../constants/theme';

interface GlassCardProps {
  children: ReactNode;
  compact?: boolean;
}

export function GlassCard({ children, compact = false }: GlassCardProps) {
  return <View style={[styles.card, compact && styles.compact]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.panel,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  compact: {
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },
});
