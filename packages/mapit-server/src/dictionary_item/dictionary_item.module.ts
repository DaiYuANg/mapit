import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictionaryItem } from './entities/dictionary_item.entity';
import { Dictionary } from '../dictionary/entities/dictionary.entity';
import { DictionaryItemService } from './dictionary_item.service';
import { DictionaryItemController } from './dictionary_item.controller';
import { CacheModule } from '@nestjs/cache-manager';
// @ts-expect-error: No type definitions for 'cache-manager-ioredis'
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    TypeOrmModule.forFeature([DictionaryItem, Dictionary]),
    CacheModule.register({
      store: redisStore,
      host: '127.0.0.1',
      port: 6379,
      ttl: 3600,
    }),
  ],
  providers: [DictionaryItemService],
  controllers: [DictionaryItemController],
  exports: [DictionaryItemService],
})
export class DictionaryItemModule {}
