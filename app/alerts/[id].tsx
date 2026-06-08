import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GlassCard } from '../../components/GlassCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Screen } from '../../components/Screen';
import { theme } from '../../constants/theme';
import { useMission } from '../../context/MissionContext';

export default function AlertDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { alerts } = useMission();
  const alert = alerts.find((item) => item.id === id);

  if (!alert) {
    return (
      <Screen>
        <GlassCard>
          <Text style={styles.title}>Alerta não encontrado</Text>
          <Text style={styles.message}>O alerta pode ter sido resolvido após uma atualização de telemetria.</Text>
          <PrimaryButton title="Voltar" onPress={() => router.back()} variant="secondary" />
        </GlassCard>
      </Screen>
    );
  }

  const color = alert.level === 'CRITICAL' ? theme.colors.red : alert.level === 'WARNING' ? theme.colors.yellow : theme.colors.green;

  return (
    <Screen>
      <Text style={styles.kicker}>DETALHE DO ALERTA</Text>
      <Text style={styles.title}>{alert.title}</Text>

      <GlassCard>
        <View style={[styles.badge, { borderColor: color }]}>
          <Text style={[styles.badgeText, { color }]}>{alert.level}</Text>
        </View>

        <Text style={styles.label}>Mensagem</Text>
        <Text style={styles.message}>{alert.message}</Text>

        <Text style={styles.label}>Métrica monitorada</Text>
        <Text style={styles.value}>{alert.metric}</Text>

        {typeof alert.value === 'number' ? (
          <>
            <Text style={styles.label}>Valor registrado</Text>
            <Text style={styles.value}>{alert.value}</Text>
          </>
        ) : null}

        <Text style={styles.label}>Recomendação operacional</Text>
        <Text style={styles.recommendation}>{alert.recommendation}</Text>
      </GlassCard>

      <PrimaryButton title="Voltar ao dashboard" onPress={() => router.replace('/dashboard')} variant="secondary" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  kicker: {
    color: theme.colors.cyan,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.8,
    marginBottom: 8,
  },
  title: {
    color: theme.colors.text,
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 36,
    marginBottom: theme.spacing.md,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 99,
    borderWidth: 1,
    marginBottom: theme.spacing.md,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  label: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginBottom: 6,
    marginTop: theme.spacing.md,
    textTransform: 'uppercase',
  },
  message: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 23,
    marginBottom: theme.spacing.sm,
  },
  value: {
    color: theme.colors.cyan,
    fontSize: 17,
    fontWeight: '900',
  },
  recommendation: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
});
