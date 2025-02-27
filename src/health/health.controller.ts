import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { DatabaseService } from '../database/database.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health check')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: MongooseHealthIndicator,
    private databaseService: DatabaseService,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Check API health' })
  @ApiResponse({ status: 200, description: 'API is running' })
  @ApiResponse({ status: 500, description: 'API is failed' })
  async check() {
    return this.health.check([
      async () => this.db.pingCheck('mongodb'),
      () => ({
        databaseConnected: {
          status: this.databaseService.isConnected() ? 'up' : 'down',
        },
      }),
    ]);
  }
}
