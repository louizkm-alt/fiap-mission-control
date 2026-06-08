import { MissionAlert, MissionStatus, SensorData } from '../types';

export function generateAlerts(sensors: SensorData, alertsEnabled: boolean): MissionAlert[] {
  if (!alertsEnabled) {
    return [];
  }

  const alerts: MissionAlert[] = [];

  if (sensors.oxygen < 55) {
    alerts.push({
      id: 'oxygen-critical',
      title: 'Oxigênio em nível crítico',
      message: `Oxigênio em ${sensors.oxygen}%. A tripulação pode ser impactada.`,
      level: 'CRITICAL',
      metric: 'oxygen',
      value: sensors.oxygen,
      recommendation: 'Acione protocolo de suporte de vida e reduza consumo não essencial.',
    });
  } else if (sensors.oxygen < 75) {
    alerts.push({
      id: 'oxygen-warning',
      title: 'Oxigênio abaixo do ideal',
      message: `Oxigênio em ${sensors.oxygen}%. Monitoramento reforçado recomendado.`,
      level: 'WARNING',
      metric: 'oxygen',
      value: sensors.oxygen,
      recommendation: 'Verifique válvulas, filtros e consumo da tripulação.',
    });
  }

  if (sensors.battery < 25) {
    alerts.push({
      id: 'battery-critical',
      title: 'Bateria crítica',
      message: `Carga da bateria em ${sensors.battery}%.`,
      level: 'CRITICAL',
      metric: 'battery',
      value: sensors.battery,
      recommendation: 'Priorize sistemas vitais e reposicione painéis solares.',
    });
  } else if (sensors.battery < 45) {
    alerts.push({
      id: 'battery-warning',
      title: 'Bateria em atenção',
      message: `Carga da bateria em ${sensors.battery}%.`,
      level: 'WARNING',
      metric: 'battery',
      value: sensors.battery,
      recommendation: 'Reduza consumo auxiliar e acompanhe geração solar.',
    });
  }

  if (sensors.commSignal < 55) {
    alerts.push({
      id: 'comm-critical',
      title: 'Comunicação instável',
      message: `Sinal de comunicação em ${sensors.commSignal}%.`,
      level: 'CRITICAL',
      metric: 'commSignal',
      value: sensors.commSignal,
      recommendation: 'Alinhe antenas e confirme canal redundante.',
    });
  } else if (sensors.latency > 700) {
    alerts.push({
      id: 'latency-warning',
      title: 'Latência elevada',
      message: `Latência em ${sensors.latency} ms.`,
      level: 'WARNING',
      metric: 'latency',
      value: sensors.latency,
      recommendation: 'Recalcule janela de comunicação e valide uplink.',
    });
  }

  if (sensors.orbitalDeviation > 3) {
    alerts.push({
      id: 'orbit-critical',
      title: 'Desvio orbital crítico',
      message: `Desvio orbital em ${sensors.orbitalDeviation.toFixed(1)} km.`,
      level: 'CRITICAL',
      metric: 'orbitalDeviation',
      value: sensors.orbitalDeviation,
      recommendation: 'Executar correção de trajetória com prioridade alta.',
    });
  } else if (sensors.orbitalDeviation > 1.5) {
    alerts.push({
      id: 'orbit-warning',
      title: 'Desvio orbital acima do limite',
      message: `Desvio orbital em ${sensors.orbitalDeviation.toFixed(1)} km.`,
      level: 'WARNING',
      metric: 'orbitalDeviation',
      value: sensors.orbitalDeviation,
      recommendation: 'Planejar microcorreção na próxima janela operacional.',
    });
  }

  if (sensors.temperature < -5 || sensors.temperature > 38) {
    alerts.push({
      id: 'temperature-critical',
      title: 'Temperatura fora da faixa segura',
      message: `Temperatura em ${sensors.temperature}°C.`,
      level: 'CRITICAL',
      metric: 'temperature',
      value: sensors.temperature,
      recommendation: 'Ativar controle térmico e validar sensores redundantes.',
    });
  }

  if (sensors.hullIntegrity < 65) {
    alerts.push({
      id: 'hull-critical',
      title: 'Integridade estrutural comprometida',
      message: `Integridade do casco em ${sensors.hullIntegrity}%.`,
      level: 'CRITICAL',
      metric: 'hullIntegrity',
      value: sensors.hullIntegrity,
      recommendation: 'Isolar módulo afetado e iniciar inspeção remota.',
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      id: 'system-nominal',
      title: 'Todos os sistemas nominais',
      message: 'Nenhum parâmetro crítico identificado no momento.',
      level: 'INFO',
      metric: 'system',
      recommendation: 'Manter rotina de monitoramento.',
    });
  }

  return alerts;
}

export function calculateMissionStatus(alerts: MissionAlert[]): MissionStatus {
  if (alerts.some((alert) => alert.level === 'CRITICAL')) {
    return 'CRÍTICO';
  }

  if (alerts.some((alert) => alert.level === 'WARNING')) {
    return 'ATENÇÃO';
  }

  return 'NOMINAL';
}

export function calculateHealthScore(sensors: SensorData): number {
  const values = [
    sensors.oxygen,
    sensors.hullIntegrity,
    sensors.fuel,
    sensors.battery,
    sensors.solarOutput,
    sensors.commSignal,
    Math.max(0, 100 - sensors.orbitalDeviation * 20),
    Math.max(0, 100 - sensors.latency / 10),
  ];

  const score = values.reduce((sum, value) => sum + value, 0) / values.length;
  return Math.round(Math.max(0, Math.min(100, score)));
}
