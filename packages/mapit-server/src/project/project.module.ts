import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { CacheModule } from '@nestjs/cache-manager';
// @ts-expect-error: No type definitions for 'cache-manager-ioredis'
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    CacheModule.register({
      store: redisStore,
      host: '127.0.0.1',
      port: 6379,
      ttl: 3600,
    }),
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService], // 如果有需要被其他模块用到
})
export class ProjectModule {}
