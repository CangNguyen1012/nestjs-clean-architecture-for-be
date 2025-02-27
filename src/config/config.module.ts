// # Centralized configuration module
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './jwt.config';
import appConfig from './app.config';
import databaseConfig from './database.config';
import { envValidationSchema } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, appConfig, databaseConfig],
      validationSchema: envValidationSchema,
    }),
  ],
})
export class AppConfigModule {}
