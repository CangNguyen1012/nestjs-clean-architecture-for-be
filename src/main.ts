import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { RolesGuard } from './common/guards/roles.guard';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { setupSwagger } from './docs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const config = app.get<ConfigService>('configService');
  const env = config.get<string>('NODE_ENV');

  app.useGlobalGuards(new RolesGuard());

  app.useGlobalFilters(new HttpExceptionFilter());

  // ✅ Enable CORS
  app.enableCors();

  // ✅ Security: Add Helmet for security headers
  app.use(helmet());

  // ✅ Global Prefix (All routes start with `/api`)
  app.setGlobalPrefix('api');

  // ✅ Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Removes unknown properties
      forbidNonWhitelisted: true, // Throws an error for unknown properties
      transform: true, // Auto-transform payloads to DTOs
    }),
  );

  // ✅ Setup Swagger (API Documentation)
  if (env === 'development') {
    setupSwagger(app); // Enable Swagger only in development
  }

  // ✅ Custom Logger
  app.useLogger(app.get('logger'));

  // ✅ Handle Graceful Shutdown (Close DB connections, clean up)
  app.enableShutdownHooks();

  // Start the app
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  Logger.log(`🚀 Server running on http://localhost:${PORT}/api`, 'Bootstrap');
  Logger.log(`📜 Swagger Docs: http://localhost:${PORT}/api/docs`, 'Bootstrap');
}
bootstrap().catch((error: Error) => {
  Logger.error(`❌ Error starting server: ${error.message}`, '', 'Bootstrap');
});
