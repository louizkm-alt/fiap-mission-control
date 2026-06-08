import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { AlertCard } from '../../components/AlertCard';
import { GlassCard } from '../../components/GlassCard';
import { MetricCard } from '../../components/MetricCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Screen } from '../../components/Screen';
import { StatusPill } from '../../components/StatusPill';
import { theme } from '../../constants/theme';
import { useMission } from '../../context/MissionContext';
import { calculateHealthScore } from '../../utils/alerts';

function metricStatus(value: number, warning: number, critical: number) {
  if (value <= critical) {
    return 'critical' as const;
  }
  if (value <= warning) {
    return 'warning' as const;
  }
  return 'ok' as const;
}

export default function DashboardScreen() {
  const { state, alerts, isReady, simulateTelemetry } = useMission();
  const healthScore = calculateHealthScore(state.sensors);

  useEffect(() => {
    if (!state.settings.autoSimulation) {
      return;
    }

    const interval = setInterval(simulateTelemetry, 6000);
    return () => clearInterval(interval);
  }, [state.settings.autoSimulation, simulateTelemetry]);

  if (!isReady) {
    return (
      <Screen scroll={false}>
        <View style={styles.loading}>
          <ActivityIndicator color={theme.colors.cyan} />
          <Text style={styles.loadingText}>Carregando central de missão...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.kicker}>CENTRAL DE MONITORAMENTO ESPACIAL</Text>
        <Text style={styles.title}>{state.mission.name}</Text>
        <Text style={styles.subtitle}>{state.mission.objective}</Text>
        <StatusPill status={state.mission.status} />
      </View>

      <GlassCard>
        <View style={styles.summaryHeader}>
          <View>
            <Text style={styles.cardLabel}>Saúde geral da missão</Text>
            <Text style={styles.health}>{healthScore}%</Text>
          </View>
          <PrimaryButton title="Simular telemetria" onPress={simulateTelemetry} variant="secondary" />
        </View>
        <Text style={styles.updated}>Última atualização: {new Date(state.lastUpdated).toLocaleString('pt-BR')}</Text>
      </GlassCard>

      <Text style={styles.sectionTitle}>Dashboards operacionais</Text>
      <View style={styles.grid}>
        <MetricCard label="Oxigênio" value={`${state.sensors.oxygen}%`} detail="Suporte de vida" progress={state.sensors.oxygen} status={metricStatus(state.sensors.oxygen, 75, 55)} />
        <MetricCard label="Bateria" value={`${state.sensors.battery}%`} detail="Energia acumulada" progress={state.sensors.battery} status={metricStatus(state.sensors.battery, 45, 25)} />
        <MetricCard label="Comunicação" value={`${state.sensors.commSignal}%`} detail={`${state.sensors.latency} ms`} progress={state.sensors.commSignal} status={metricStatus(state.sensors.commSignal, 70, 55)} />
        <MetricCard label="Órbita" value={`${state.sensors.orbitalDeviation} km`} detail="Desvio orbital" progress={Math.max(0, 100 - state.sensors.orbitalDeviation * 20)} status={state.sensors.orbitalDeviation > 3 ? 'critical' : state.sensors.orbitalDeviation > 1.5 ? 'warning' : 'ok'} />
        <MetricCard label="Casco" value={`${state.sensors.hullIntegrity}%`} detail="Estabilidade estrutural" progress={state.sensors.hullIntegrity} status={metricStatus(state.sensors.hullIntegrity, 80, 65)} />
        <MetricCard label="Combustível" value={`${state.sensors.fuel}%`} detail="Reserva de manobra" progress={state.sensors.fuel} status={metricStatus(state.sensors.fuel, 35, 18)} />
        <MetricCard label="Temp." value={`${state.sensors.temperature}°C`} detail="Controle térmico" progress={70} status={state.sensors.temperature < -5 || state.sensors.temperature > 38 ? 'critical' : 'ok'} />
        <MetricCard label="Solar" value={`${state.sensors.solarOutput}%`} detail="Geração atual" progress={state.sensors.solarOutput} status={metricStatus(state.sensors.solarOutput, 50, 25)} />
      </View>

      <Text style={styles.sectionTitle}>Alertas automáticos</Text>
      {alerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    marginBottom: theme.spacing.md,
  },
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
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: theme.spacing.md,
    marginTop: 8,
  },
  summaryHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  cardLabel: {
    color: theme.colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  health: {
    color: theme.colors.text,
    fontSize: 42,
    fontWeight: '900',
    marginTop: 2,
  },
  updated: {
    color: theme.colors.muted,
    fontSize: 12,
    marginTop: 12,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    color: theme.colors.muted,
    marginTop: 12,
  },
});
