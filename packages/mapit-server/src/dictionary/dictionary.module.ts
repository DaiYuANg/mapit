import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';
import { Dictionary } from './entities/dictionary.entity';
import { DictionaryItem } from '../dictionary_item/entities/dictionary_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dictionary, DictionaryItem])],
  controllers: [DictionaryController],
  providers: [DictionaryService],
  exports: [DictionaryService],
})
export class DictionaryModule {}
