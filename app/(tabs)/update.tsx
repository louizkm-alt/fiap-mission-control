import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { FormField } from '../../components/FormField';
import { GlassCard } from '../../components/GlassCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Screen } from '../../components/Screen';
import { theme } from '../../constants/theme';
import { useMission } from '../../context/MissionContext';
import { parseNumber, validateMissionForm } from '../../utils/validators';

export default function UpdateScreen() {
  const { state, updateMission, updateSensors } = useMission();

  const initialValues = useMemo(
    () => ({
      name: state.mission.name,
      commander: state.mission.commander,
      objective: state.mission.objective,
      targetOrbit: state.mission.targetOrbit,
      crew: String(state.mission.crew),
      oxygen: String(state.sensors.oxygen),
      battery: String(state.sensors.battery),
      commSignal: String(state.sensors.commSignal),
      orbitalDeviation: String(state.sensors.orbitalDeviation),
      latency: String(state.sensors.latency),
      temperature: String(state.sensors.temperature),
    }),
    [state]
  );

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setValue = (key: string, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = () => {
    const result = validateMissionForm(values);
    setErrors(result.errors);

    if (!result.valid) {
      Alert.alert('Revise os campos', 'Existem campos obrigatórios ou fora dos limites permitidos.');
      return;
    }

    updateMission({
      name: values.name.trim(),
      commander: values.commander.trim(),
      objective: values.objective.trim(),
      targetOrbit: values.targetOrbit.trim(),
      crew: parseNumber(values.crew),
    });

    updateSensors({
      oxygen: parseNumber(values.oxygen),
      battery: parseNumber(values.battery),
      commSignal: parseNumber(values.commSignal),
      orbitalDeviation: parseNumber(values.orbitalDeviation),
      latency: parseNumber(values.latency),
      temperature: parseNumber(values.temperature),
    });

    Alert.alert('Dados salvos', 'A missão e a telemetria foram atualizadas com sucesso.');
  };

  return (
    <Screen>
      <Text style={styles.kicker}>FORMULÁRIO COM VALIDAÇÃO</Text>
      <Text style={styles.title}>Atualizar dados</Text>
      <Text style={styles.subtitle}>Campos obrigatórios e limites são validados antes de salvar no estado global e no AsyncStorage.</Text>

      <GlassCard>
        <Text style={styles.section}>Dados da missão</Text>
        <FormField label="Nome da missão *" value={values.name} onChangeText={(text) => setValue('name', text)} error={errors.name} />
        <FormField label="Comandante / responsável *" value={values.commander} onChangeText={(text) => setValue('commander', text)} error={errors.commander} />
        <FormField label="Objetivo" value={values.objective} onChangeText={(text) => setValue('objective', text)} multiline />
        <FormField label="Órbita alvo *" value={values.targetOrbit} onChangeText={(text) => setValue('targetOrbit', text)} error={errors.targetOrbit} />
        <FormField label="Tripulação, 1 a 12 *" value={values.crew} onChangeText={(text) => setValue('crew', text)} keyboardType="numeric" error={errors.crew} />
      </GlassCard>

      <GlassCard>
        <Text style={styles.section}>Telemetria crítica</Text>
        <View style={styles.row}>
          <View style={styles.half}>
            <FormField label="Oxigênio %" value={values.oxygen} onChangeText={(text) => setValue('oxygen', text)} keyboardType="numeric" error={errors.oxygen} />
          </View>
          <View style={styles.half}>
            <FormField label="Bateria %" value={values.battery} onChangeText={(text) => setValue('battery', text)} keyboardType="numeric" error={errors.battery} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.half}>
            <FormField label="Comunicação %" value={values.commSignal} onChangeText={(text) => setValue('commSignal', text)} keyboardType="numeric" error={errors.commSignal} />
          </View>
          <View style={styles.half}>
            <FormField label="Latência ms" value={values.latency} onChangeText={(text) => setValue('latency', text)} keyboardType="numeric" error={errors.latency} />
          </View>
        </View>

        <FormField label="Desvio orbital km" value={values.orbitalDeviation} onChangeText={(text) => setValue('orbitalDeviation', text)} keyboardType="numeric" error={errors.orbitalDeviation} />
        <FormField label="Temperatura °C" value={values.temperature} onChangeText={(text) => setValue('temperature', text)} keyboardType="numeric" error={errors.temperature} />

        <PrimaryButton title="Salvar alterações" onPress={handleSubmit} />
      </GlassCard>
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
  section: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  half: {
    flex: 1,
  },
});
