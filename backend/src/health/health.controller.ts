import { Controller, Get } from '@nestjs/common';
import { readFileSync } from 'node:fs';

export interface HealthStatus {
  status: 'ok';
  version: string;
}

/**
 * Versión de la API, leída una vez del package.json. La ruta vale tanto desde `src/health/`
 * (tests) como desde `dist/health/` (build): en los dos casos está dos carpetas más arriba.
 */
const VERSION = (
  JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8')) as {
    version: string;
  }
).version;

/** Comprobación rápida de que la API responde. La usa el healthcheck de Docker. */
@Controller('health')
export class HealthController {
  @Get()
  check(): HealthStatus {
    return { status: 'ok', version: VERSION };
  }
}
