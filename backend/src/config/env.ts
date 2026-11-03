/** Variables de entorno de la API, ya validadas y con su tipo. */
export interface Env {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
}

const NODE_ENVS: readonly Env['NODE_ENV'][] = ['development', 'production', 'test'];

/**
 * Valida el entorno al arrancar: si falta algo o no tiene sentido, la API no llega a levantarse
 * y el error dice qué variable revisar.
 */
export function validateEnv(raw: Record<string, unknown>): Env {
  const nodeEnv = (raw['NODE_ENV'] ?? 'development') as Env['NODE_ENV'];
  if (!NODE_ENVS.includes(nodeEnv)) {
    throw new Error(`NODE_ENV no válido: "${String(raw['NODE_ENV'])}"`);
  }

  const port = Number(raw['PORT'] ?? 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`PORT no válido: "${String(raw['PORT'])}"`);
  }

  return { NODE_ENV: nodeEnv, PORT: port };
}
