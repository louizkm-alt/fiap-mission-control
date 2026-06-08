import { MissionState } from '../types';

export const initialMissionState: MissionState = {
  mission: {
    id: 'ORION-LATAM-01',
    name: 'Orion LATAM One',
    crew: 4,
    commander: 'Equipe FIAP',
    objective: 'Monitorar estabilidade orbital, energia, comunicação e sensores ambientais.',
    targetOrbit: 'LEO - 408 km',
    status: 'NOMINAL',
  },
  sensors: {
    oxygen: 96,
    temperature: 22,
    radiation: 0.18,
    hullIntegrity: 98,
    fuel: 76,
    battery: 84,
    solarOutput: 91,
    commSignal: 89,
    latency: 220,
    orbitalDeviation: 0.4,
    velocity: 27600,
  },
  settings: {
    alertsEnabled: true,
    autoSimulation: false,
    compactDashboard: false,
  },
  history: [
    {
      id: 'init-001',
      message: 'Sistema inicializado com parâmetros nominais.',
      createdAt: new Date().toISOString(),
    },
  ],
  lastUpdated: new Date().toISOString(),
};
