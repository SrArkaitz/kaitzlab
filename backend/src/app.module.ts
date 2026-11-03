import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { validateEnv } from './config/env.js';

@Module({
  imports: [
    // Lee backend/.env en local; en Docker las variables vienen del docker-compose
    ConfigModule.forRoot({ isGlobal: true, cache: true, validate: validateEnv }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
