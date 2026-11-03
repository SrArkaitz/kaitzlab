import { validateEnv } from './env.js';

describe('validateEnv', () => {
  it('usa valores por defecto si no hay variables', () => {
    expect(validateEnv({})).toEqual({ NODE_ENV: 'development', PORT: 3000 });
  });

  it('convierte PORT a número', () => {
    expect(validateEnv({ PORT: '5080', NODE_ENV: 'production' })).toEqual({
      NODE_ENV: 'production',
      PORT: 5080,
    });
  });

  it('rechaza un PORT no válido', () => {
    expect(() => validateEnv({ PORT: 'abc' })).toThrow('PORT no válido');
    expect(() => validateEnv({ PORT: '70000' })).toThrow('PORT no válido');
  });

  it('rechaza un NODE_ENV desconocido', () => {
    expect(() => validateEnv({ NODE_ENV: 'staging' })).toThrow('NODE_ENV no válido');
  });
});
