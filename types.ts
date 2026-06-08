export type MissionStatus = 'NOMINAL' | 'ATENÇÃO' | 'CRÍTICO';

export type AlertLevel = 'INFO' | 'WARNING' | 'CRITICAL';

export interface SensorData {
  oxygen: number;
  temperature: number;
  radiation: number;
  hullIntegrity: number;
  fuel: number;
  battery: number;
  solarOutput: number;
  commSignal: number;
  latency: number;
  orbitalDeviation: number;
  velocity: number;
}

export interface MissionInfo {
  id: string;
  name: string;
  crew: number;
  commander: string;
  objective: string;
  targetOrbit: string;
  status: MissionStatus;
}

export interface MissionSettings {
  alertsEnabled: boolean;
  autoSimulation: boolean;
  compactDashboard: boolean;
}

export interface MissionHistoryItem {
  id: string;
  message: string;
  createdAt: string;
}

export interface MissionAlert {
  id: string;
  title: string;
  message: string;
  level: AlertLevel;
  metric: keyof SensorData | 'system';
  value?: number;
  recommendation: string;
}

export interface MissionState {
  mission: MissionInfo;
  sensors: SensorData;
  settings: MissionSettings;
  history: MissionHistoryItem[];
  lastUpdated: string;
}
