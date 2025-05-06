import { Module } from '@nestjs/common';
import { DictionaryItemService } from './dictionary_item.service';
import { DictionaryItemController } from './dictionary_item.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Dictionary} from "../dictionary/entities/dictionary.entity";
import {DictionaryItem} from "./entities/dictionary_item.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DictionaryItem])],
  controllers: [DictionaryItemController],
  providers: [DictionaryItemService],
})
export class DictionaryItemModule {}
