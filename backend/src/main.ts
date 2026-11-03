import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { API_PREFIX, setupApp } from './app.setup.js';
import { Env } from './config/env.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupApp(app);

  const port = app.get(ConfigService<Env, true>).get('PORT', { infer: true });
  // 0.0.0.0 para que responda dentro del contenedor, no solo en localhost
  await app.listen(port, '0.0.0.0');
  Logger.log(`API de kaitzlab escuchando en http://localhost:${port}/${API_PREFIX}`, 'Bootstrap');
}
await bootstrap();
