import React from 'react';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';

import { GlassCard } from '../../components/GlassCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Screen } from '../../components/Screen';
import { theme } from '../../constants/theme';
import { useMission } from '../../context/MissionContext';

export default function SettingsScreen() {
  const { state, updateSettings, resetMission } = useMission();

  const confirmReset = () => {
    Alert.alert('Reiniciar missão?', 'Isso limpará os dados salvos localmente e voltará para os valores padrão.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Reiniciar', style: 'destructive', onPress: resetMission },
    ]);
  };

  return (
    <Screen>
      <Text style={styles.kicker}>CONFIGURAÇÕES</Text>
      <Text style={styles.title}>Controle local</Text>
      <Text style={styles.subtitle}>As preferências também ficam persistidas localmente com AsyncStorage.</Text>

      <GlassCard>
        <View style={styles.option}>
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>Alertas automáticos</Text>
            <Text style={styles.optionDescription}>Gera alertas quando parâmetros atingem níveis críticos.</Text>
          </View>
          <Switch
            value={state.settings.alertsEnabled}
            onValueChange={(value) => updateSettings({ alertsEnabled: value })}
            thumbColor={state.settings.alertsEnabled ? theme.colors.cyan : theme.colors.muted}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.option}>
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>Simulação automática</Text>
            <Text style={styles.optionDescription}>Atualiza a telemetria automaticamente a cada 6 segundos.</Text>
          </View>
          <Switch
            value={state.settings.autoSimulation}
            onValueChange={(value) => updateSettings({ autoSimulation: value })}
            thumbColor={state.settings.autoSimulation ? theme.colors.cyan : theme.colors.muted}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.option}>
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>Dashboard compacto</Text>
            <Text style={styles.optionDescription}>Configuração reservada para evolução do layout.</Text>
          </View>
          <Switch
            value={state.settings.compactDashboard}
            onValueChange={(value) => updateSettings({ compactDashboard: value })}
            thumbColor={state.settings.compactDashboard ? theme.colors.cyan : theme.colors.muted}
          />
        </View>
      </GlassCard>

      <GlassCard>
        <Text style={styles.optionTitle}>Persistência local</Text>
        <Text style={styles.optionDescription}>
          Missão, telemetria, histórico e configurações são salvos no dispositivo. Ao fechar e abrir o app, os dados continuam disponíveis.
        </Text>
      </GlassCard>

      <PrimaryButton title="Reiniciar dados da missão" onPress={confirmReset} variant="danger" />
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
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: theme.spacing.md,
    marginTop: 8,
  },
  option: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionText: {
    flex: 1,
    paddingRight: theme.spacing.md,
  },
  optionTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  optionDescription: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },
  divider: {
    backgroundColor: theme.colors.border,
    height: 1,
    marginVertical: theme.spacing.md,
  },
});
