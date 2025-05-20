import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProjectModule} from './project/project.module';
import {DictionaryModule} from './dictionary/dictionary.module';
import {DictionaryItemModule} from './dictionary_item/dictionary_item.module';
import {AccessKeyModule} from './access_key/access_key.module';
import {CacheModule} from '@nestjs/cache-manager';
import configuration from './config/configuration';
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from 'path';
import {TerminusModule} from "@nestjs/terminus";
import {HttpModule} from "@nestjs/axios";
import {EventEmitterModule} from "@nestjs/event-emitter";
import {ScheduleModule} from "@nestjs/schedule";
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {ThrottlerModule} from "@nestjs/throttler";
import {HealthController} from './health/health.controller';
import {HealthModule} from './health/health.module';

@Module({
  imports: [
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
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: ':memory:', // 👈 内存 SQLite 的关键配置
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 自动建表（开发阶段可用）
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
export class AppModule {
}
