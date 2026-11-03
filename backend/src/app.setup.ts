import { INestApplication } from '@nestjs/common';

/** Prefijo de todas las rutas. nginx reenvía `/api` a este contenedor. */
export const API_PREFIX = 'api';

/**
 * Configuración común de la app. La usan `main.ts` y los tests e2e, para que los tests
 * prueben la API tal y como se publica.
 */
export function setupApp(app: INestApplication): void {
  app.setGlobalPrefix(API_PREFIX);
  // Sin CORS: en producción nginx sirve la web y la API desde el mismo origen,
  // y en desarrollo lo hace el proxy de Angular.
}
