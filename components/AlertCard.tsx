import { Link } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '../constants/theme';
import { MissionAlert } from '../types';

interface AlertCardProps {
  alert: MissionAlert;
}

export function AlertCard({ alert }: AlertCardProps) {
  const color = alert.level === 'CRITICAL' ? theme.colors.red : alert.level === 'WARNING' ? theme.colors.yellow : theme.colors.green;

  return (
    <Link href={`/alerts/${alert.id}`} asChild>
      <Pressable style={styles.pressable}>
        <View style={[styles.border, { backgroundColor: color }]} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{alert.title}</Text>
            <Text style={[styles.level, { color }]}>{alert.level}</Text>
          </View>
          <Text style={styles.message}>{alert.message}</Text>
          <Text style={styles.link}>Ver recomendação →</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: 'rgba(15, 23, 42, 0.86)',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
    overflow: 'hidden',
  },
  border: {
    width: 5,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  title: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 15,
    fontWeight: '800',
  },
  level: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  message: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
  link: {
    color: theme.colors.cyan,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
  },
});
