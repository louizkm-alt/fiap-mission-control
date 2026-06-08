import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { theme } from '../constants/theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

export function PrimaryButton({ title, onPress, variant = 'primary' }: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.secondary,
        variant === 'danger' && styles.danger,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.pink,
    borderRadius: theme.radius.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  secondary: {
    backgroundColor: 'rgba(34, 211, 238, 0.22)',
    borderColor: theme.colors.cyan,
    borderWidth: 1,
  },
  danger: {
    backgroundColor: 'rgba(239, 68, 68, 0.35)',
    borderColor: theme.colors.red,
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },
  text: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
});
