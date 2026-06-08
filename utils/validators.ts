export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function required(value: string): boolean {
  return value.trim().length > 0;
}

export function numberInRange(value: string, min: number, max: number): boolean {
  const parsed = Number(value.replace(',', '.'));
  return Number.isFinite(parsed) && parsed >= min && parsed <= max;
}

export function parseNumber(value: string): number {
  return Number(value.replace(',', '.'));
}

export function validateMissionForm(values: Record<string, string>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!required(values.name)) {
    errors.name = 'Informe o nome da missão.';
  }

  if (!required(values.commander)) {
    errors.commander = 'Informe o comandante ou responsável.';
  }

  if (!required(values.targetOrbit)) {
    errors.targetOrbit = 'Informe a órbita alvo.';
  }

  if (!numberInRange(values.crew, 1, 12)) {
    errors.crew = 'Tripulação deve ser um número entre 1 e 12.';
  }

  if (!numberInRange(values.oxygen, 0, 100)) {
    errors.oxygen = 'Oxigênio deve estar entre 0 e 100%.';
  }

  if (!numberInRange(values.battery, 0, 100)) {
    errors.battery = 'Bateria deve estar entre 0 e 100%.';
  }

  if (!numberInRange(values.commSignal, 0, 100)) {
    errors.commSignal = 'Comunicação deve estar entre 0 e 100%.';
  }

  if (!numberInRange(values.orbitalDeviation, 0, 10)) {
    errors.orbitalDeviation = 'Desvio orbital deve estar entre 0 e 10 km.';
  }

  if (!numberInRange(values.latency, 0, 2000)) {
    errors.latency = 'Latência deve estar entre 0 e 2000 ms.';
  }

  if (!numberInRange(values.temperature, -80, 80)) {
    errors.temperature = 'Temperatura deve estar entre -80 e 80°C.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
