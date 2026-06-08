import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GlassCard } from '../../components/GlassCard';
import { Screen } from '../../components/Screen';
import { StatusPill } from '../../components/StatusPill';
import { theme } from '../../constants/theme';
import { useMission } from '../../context/MissionContext';

export default function MissionScreen() {
  const { state } = useMission();

  return (
    <Screen>
      <Text style={styles.kicker}>INFORMAÇÕES DA MISSÃO</Text>
      <Text style={styles.title}>{state.mission.name}</Text>

      <GlassCard>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.label}>ID</Text>
            <Text style={styles.value}>{state.mission.id}</Text>
          </View>
          <StatusPill status={state.mission.status} />
        </View>

        <View style={styles.line} />

        <Text style={styles.label}>Objetivo</Text>
        <Text style={styles.paragraph}>{state.mission.objective}</Text>

        <View style={styles.twoColumns}>
          <View style={styles.column}>
            <Text style={styles.label}>Comandante</Text>
            <Text style={styles.value}>{state.mission.commander}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Tripulação</Text>
            <Text style={styles.value}>{state.mission.crew} pessoas</Text>
          </View>
        </View>

        <Text style={styles.label}>Órbita alvo</Text>
        <Text style={styles.value}>{state.mission.targetOrbit}</Text>
      </GlassCard>

      <Text style={styles.sectionTitle}>Log operacional</Text>
      {state.history.map((item) => (
        <GlassCard key={item.id} compact>
          <Text style={styles.historyDate}>{new Date(item.createdAt).toLocaleString('pt-BR')}</Text>
          <Text style={styles.historyMessage}>{item.message}</Text>
        </GlassCard>
      ))}
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
    marginBottom: theme.spacing.md,
  },
  headerRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 6,
    marginTop: 6,
    textTransform: 'uppercase',
  },
  value: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  paragraph: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 23,
  },
  line: {
    backgroundColor: theme.colors.border,
    height: 1,
    marginVertical: theme.spacing.md,
  },
  twoColumns: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  column: {
    flex: 1,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: theme.spacing.sm,
  },
  historyDate: {
    color: theme.colors.cyan,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
  },
  historyMessage: {
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
});
