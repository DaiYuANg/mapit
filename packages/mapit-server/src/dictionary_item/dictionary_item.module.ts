import { Module } from '@nestjs/common';
import { DictionaryItemService } from './dictionary_item.service';
import { DictionaryItemController } from './dictionary_item.controller';

@Module({
  controllers: [DictionaryItemController],
  providers: [DictionaryItemService],
})
export class DictionaryItemModule {}
