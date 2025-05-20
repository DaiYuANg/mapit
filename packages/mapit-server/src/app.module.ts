import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { DictionaryItemModule } from './dictionary_item/dictionary_item.module';
import { AccessKeyModule } from './access_key/access_key.module';
import { CacheModule } from '@nestjs/cache-manager';
import configuration from './config/configuration';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
