import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { DictionaryItemModule } from './dictionary_item/dictionary_item.module';
import { AccessKeyModule } from './access_key/access_key.module';
import { CacheModule } from '@nestjs/cache-manager';
import configuration, { CacheConfig, DatabaseConfig, JwtConfig } from './config/configuration';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { HealthController } from './health/health.controller';
import { HealthModule } from './health/health.module';
import { JwtModule } from '@nestjs/jwt';
import KeyvRedis, { createKeyv, Keyv } from '@keyv/redis';
import { CacheableMemory } from 'cacheable';
import { AccessKey } from './access_key/entities/access_key.entity';
import { Project } from './project/entities/project.entity';
import { Dictionary } from './dictionary/entities/dictionary.entity';
import { DictionaryItem } from './dictionary_item/entities/dictionary_item.entity';
import { InitDatabase1749804669929 } from './migration/init.database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const jwtConfig = configService.get<JwtConfig>('jwt')!;
        return {
          secret: jwtConfig.secret,
          signOptions: {
            expiresIn: jwtConfig.expiresIn,
          },
          secretOrPrivateKey: jwtConfig.secret,
        };
      },
    }),
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
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const _cache = configService.get<CacheConfig>('cache')!;
        const storeMap: Record<string, () => Keyv<any>> = {
          redis: () => new Keyv({ store: new KeyvRedis(`redis://${_cache.host}:${_cache.port}`) }),
          memory: () => new Keyv({ store: new CacheableMemory({ ttl: 60 * 1000, lruSize: 5000 }) }),
        };
        const store = (storeMap[_cache.store] ?? storeMap['memory'])();
        return {
          stores: store,
          isGlobal: true,
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const dbConfig = config.get<DatabaseConfig>('database')!;
        return {
          type: dbConfig.type,
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          // synchronize: process.env.MODE === 'development',
          synchronize: false,
          logging: 'all',
          migrations: [InitDatabase1749804669929],
          migrationsRun: true,
          migrationsTableName: 'mapit_migration',
          logger: 'simple-console',
        };
      },
      inject: [ConfigService],
    }),
    ProjectModule,
    DictionaryModule,
    DictionaryItemModule,
    AccessKeyModule,
    UserModule,
    AuthModule,
    HealthModule,
    TypeOrmModule.forFeature([AccessKey, Project, Dictionary, DictionaryItem]),
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class AppModule {}
