// # Swagger setup
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  if (process.env.NODE_ENV !== 'development') {
    return; // Only enable Swagger in development
  }

  const config = new DocumentBuilder()
    .setTitle('NestJS Clean Architecture') // Change this to your project name
    .setDescription('NestJS Clean Architecture API Documentation')
    .setVersion('1.0')
    .addTag('Health check')
    .addBearerAuth() // Enables JWT authentication in Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Keeps authentication token after refresh
    },
  });

  console.log(`📄 Swagger is running at: http://localhost:3000/api/docs`);
}
