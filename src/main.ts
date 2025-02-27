import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as cors from 'cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // ✅ Enable CORS
  app.use(cors());

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
  const config = new DocumentBuilder()
    .setTitle('Drink Ordering API')
    .setDescription('API Documentation for the Drink Ordering App')
    .setVersion('1.0')
    .addBearerAuth() // Supports JWT Auth
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // ✅ Use Pino Logger (Fast logging)
  app.useLogger(app.get(PinoLogger));

  // ✅ Handle Graceful Shutdown (Close DB connections, clean up)
  app.enableShutdownHooks();

  // Start the app
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  Logger.log(`🚀 Server running on http://localhost:${PORT}/api`, 'Bootstrap');
  Logger.log(`📜 Swagger Docs: http://localhost:${PORT}/api/docs`, 'Bootstrap');
}
bootstrap();
