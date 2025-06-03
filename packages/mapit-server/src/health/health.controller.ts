import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  checkDB() {
    return this.health.check([() => this.db.pingCheck('database')]);
  }

  @Get()
  @HealthCheck()
  checkDisk() {
    return this.health.check([() => this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 })]);
  }

  @Get()
  @HealthCheck()
  checkMemory() {
    return this.health.check([() => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024)]);
  }
}
