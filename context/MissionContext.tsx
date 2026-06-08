import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';

import { initialMissionState } from '../data/initialMission';
import { calculateMissionStatus, generateAlerts } from '../utils/alerts';
import { MissionAlert, MissionInfo, MissionSettings, MissionState, SensorData } from '../types';

const STORAGE_KEY = '@fiap-mission-control/state-v1';

type MissionAction =
  | { type: 'HYDRATE'; payload: MissionState }
  | { type: 'UPDATE_MISSION'; payload: Partial<MissionInfo> }
  | { type: 'UPDATE_SENSORS'; payload: Partial<SensorData> }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<MissionSettings> }
  | { type: 'ADD_HISTORY'; payload: string }
  | { type: 'RESET' };

interface MissionContextValue {
  state: MissionState;
  alerts: MissionAlert[];
  isReady: boolean;
  updateMission: (payload: Partial<MissionInfo>) => void;
  updateSensors: (payload: Partial<SensorData>) => void;
  updateSettings: (payload: Partial<MissionSettings>) => void;
  simulateTelemetry: () => void;
  resetMission: () => void;
}

function addHistory(state: MissionState, message: string): MissionState {
  const item = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    message,
    createdAt: new Date().toISOString(),
  };

  return {
    ...state,
    history: [item, ...state.history].slice(0, 20),
    lastUpdated: new Date().toISOString(),
  };
}

function reducer(state: MissionState, action: MissionAction): MissionState {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload;

    case 'UPDATE_MISSION': {
      const updated = {
        ...state,
        mission: {
          ...state.mission,
          ...action.payload,
        },
        lastUpdated: new Date().toISOString(),
      };

      return addHistory(updated, 'Dados da missão atualizados manualmente.');
    }

    case 'UPDATE_SENSORS': {
      const updatedSensors = {
        ...state.sensors,
        ...action.payload,
      };

      const updatedAlerts = generateAlerts(updatedSensors, state.settings.alertsEnabled);

      const updated = {
        ...state,
        sensors: updatedSensors,
        mission: {
          ...state.mission,
          status: calculateMissionStatus(updatedAlerts),
        },
        lastUpdated: new Date().toISOString(),
      };

      return addHistory(updated, 'Telemetria atualizada pelo operador.');
    }

    case 'UPDATE_SETTINGS': {
      const updated = {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
        lastUpdated: new Date().toISOString(),
      };

      return addHistory(updated, 'Configurações do painel atualizadas.');
    }

    case 'ADD_HISTORY':
      return addHistory(state, action.payload);

    case 'RESET':
      return {
        ...initialMissionState,
        lastUpdated: new Date().toISOString(),
        history: [
          {
            id: `reset-${Date.now()}`,
            message: 'Missão reiniciada para os valores padrão.',
            createdAt: new Date().toISOString(),
          },
        ],
      };

    default:
      return state;
  }
}

const MissionContext = createContext<MissionContextValue | undefined>(undefined);

export function MissionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialMissionState);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadState() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          dispatch({ type: 'HYDRATE', payload: JSON.parse(stored) as MissionState });
        }
      } catch (error) {
        console.warn('Falha ao carregar estado local:', error);
      } finally {
        setIsReady(true);
      }
    }

    loadState();
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch((error) => {
      console.warn('Falha ao salvar estado local:', error);
    });
  }, [state, isReady]);

  const alerts = useMemo(
    () => generateAlerts(state.sensors, state.settings.alertsEnabled),
    [state.sensors, state.settings.alertsEnabled]
  );

  const updateMission = useCallback((payload: Partial<MissionInfo>) => {
    dispatch({ type: 'UPDATE_MISSION', payload });
  }, []);

  const updateSensors = useCallback((payload: Partial<SensorData>) => {
    dispatch({ type: 'UPDATE_SENSORS', payload });
  }, []);

  const updateSettings = useCallback((payload: Partial<MissionSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload });
  }, []);

  const resetMission = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const simulateTelemetry = useCallback(() => {
    const randomDelta = (value: number, variation: number, min: number, max: number) => {
      const next = value + (Math.random() * variation * 2 - variation);
      return Math.round(Math.max(min, Math.min(max, next)) * 10) / 10;
    };

    dispatch({
      type: 'UPDATE_SENSORS',
      payload: {
        oxygen: randomDelta(state.sensors.oxygen, 3, 35, 100),
        temperature: randomDelta(state.sensors.temperature, 2, -20, 45),
        radiation: randomDelta(state.sensors.radiation, 0.08, 0, 2),
        hullIntegrity: randomDelta(state.sensors.hullIntegrity, 1, 40, 100),
        fuel: randomDelta(state.sensors.fuel, 2, 0, 100),
        battery: randomDelta(state.sensors.battery, 5, 0, 100),
        solarOutput: randomDelta(state.sensors.solarOutput, 7, 0, 100),
        commSignal: randomDelta(state.sensors.commSignal, 8, 20, 100),
        latency: randomDelta(state.sensors.latency, 90, 60, 1800),
        orbitalDeviation: randomDelta(state.sensors.orbitalDeviation, 0.35, 0, 6),
        velocity: randomDelta(state.sensors.velocity, 90, 26000, 28500),
      },
    });
  }, [state.sensors]);

  const value = useMemo(
    () => ({
      state,
      alerts,
      isReady,
      updateMission,
      updateSensors,
      updateSettings,
      simulateTelemetry,
      resetMission,
    }),
    [state, alerts, isReady, updateMission, updateSensors, updateSettings, simulateTelemetry, resetMission]
  );

  return <MissionContext.Provider value={value}>{children}</MissionContext.Provider>;
}

export function useMission() {
  const context = useContext(MissionContext);

  if (!context) {
    throw new Error('useMission deve ser usado dentro de MissionProvider.');
  }

  return context;
}
