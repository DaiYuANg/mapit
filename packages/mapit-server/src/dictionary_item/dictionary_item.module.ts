import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictionaryItem } from './entities/dictionary_item.entity';
import { Dictionary } from '../dictionary/entities/dictionary.entity';
import { DictionaryItemService } from './dictionary_item.service';
import { DictionaryItemController } from './dictionary_item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DictionaryItem, Dictionary])],
  providers: [DictionaryItemService],
  controllers: [DictionaryItemController],
})
export class DictionaryItemModule {}
