import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { DictionaryItemModule } from './dictionary_item/dictionary_item.module';
import { AccessKeyModule } from './access_key/access_key.module';
import { CacheModule } from '@nestjs/cache-manager';
import configuration from './config/configuration';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { HealthController } from './health/health.controller';
import { HealthModule } from './health/health.module';
// @ts-expect-error: No type definitions for 'cache-manager-ioredis'
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    AuthModule,
    HealthModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    HttpModule,
    TerminusModule.forRoot({
      gracefulShutdownTimeoutMs: 1000,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '.', 'mapit-ui'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      // password: 'yourpassword', // 如有密码可取消注释
      ttl: 3600, // 默认缓存1小时
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) =>
        ({
          type: config.get<'mysql' | 'postgres' | 'sqlite' | 'better-sqlite3'>('DB_TYPE', 'better-sqlite3'),
          host: config.get('DB_HOST', 'localhost'),
          port: parseInt(config.get('DB_PORT', '3306'), 10),
          username: config.get('DB_USERNAME', 'root'),
          password: config.get('DB_PASSWORD', ''),
          database: config.get('DB_DATABASE', ':memory:'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true, // 生产环境建议 false
          logging: 'all',
          logger: 'simple-console',
        }) as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    ProjectModule,
    DictionaryModule,
    DictionaryItemModule,
    AccessKeyModule,
    UserModule,
    AuthModule,
    HealthModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
