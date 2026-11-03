import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/env.js';
import { HealthModule } from './health/health.module.js';

@Module({
  imports: [
    // Lee backend/.env en local; en Docker las variables vienen del docker-compose
    ConfigModule.forRoot({ isGlobal: true, cache: true, validate: validateEnv }),
    HealthModule,
  ],
})
export class AppModule {}
