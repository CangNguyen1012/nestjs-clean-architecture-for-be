import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RolesGuard } from './common/guards/roles.guard';
import { UsersModule } from './modules/user/user.module';
import { LoggingMiddleware } from './common/middleware/logging.middleware';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables
    DatabaseModule, // Import database module
    UsersModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('cats');
  }
}
