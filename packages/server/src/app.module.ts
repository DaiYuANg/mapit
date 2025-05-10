import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictionaryModule } from './dictionary/dictionary.module';
import { ProjectModule } from './project/project.module';
import { DictionaryItemModule } from './dictionary_item/dictionary_item.module';
import { ScheduleModule } from '@nestjs/schedule';
import { Dictionary } from './dictionary/entities/dictionary.entity';
import { DictionaryItem } from './dictionary_item/entities/dictionary_item.entity';
import { Project } from './project/entities/project.entity';
import { AccessKeyModule } from './access_key/access_key.module';
import { AccessKey } from './access_key/entities/access_key.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration, DatabaseType } from './config/configuration';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: [configuration],
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    HttpModule,
    CacheModule.register({
      isGlobal: true,
      nonBlocking: true,
    }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'mapit.db',
      synchronize: true,
      entities: [Dictionary, DictionaryItem, Project, AccessKey, User],
      autoLoadEntities: true,
      logging: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbType = configService.getOrThrow<DatabaseType>('database.type');
        console.log(dbType);
        switch (dbType) {
          case 'mysql':
            return {
              type: 'mysql',
              host: configService.get('HOST'),
              port: +configService.get('PORT'),
              username: configService.get('USERNAME'),
              password: configService.get('PASSWORD'),
              database: configService.get('DATABASE'),
              entities: [],
              synchronize: true,
            };
          case 'sqlite3':
            return {
              type: 'better-sqlite3',
              database: 'mapit.db',
              synchronize: true,
              entities: [Dictionary, DictionaryItem, Project, AccessKey, User],
              autoLoadEntities: true,
              logging: true,
            };
          case 'postgres':
            return {
              type: 'postgres',
              host: configService.get('HOST'),
              port: +configService.get('PORT'),
              username: configService.get('USERNAME'),
              password: configService.get('PASSWORD'),
              database: configService.get('DATABASE'),
            };
          default:
            throw Error('Unsupported');
        }
      },
      dataSourceFactory: async (options) => {
        return await new DataSource(options!).initialize();
      },
    }),
    DictionaryModule,
    ProjectModule,
    DictionaryItemModule,
    ScheduleModule.forRoot(),
    AccessKeyModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
