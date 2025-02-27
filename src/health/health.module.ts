import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [DatabaseService],
})
export class HealthModule {}
