// packages/mapit-server/src/dictionary/dictionary.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';
import { Dictionary } from './entities/dictionary.entity';
import { DictionaryItem } from '../dictionary_item/entities/dictionary_item.entity';
import { Project } from '../project/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dictionary, DictionaryItem, Project])],
  controllers: [DictionaryController],
  providers: [DictionaryService],
})
export class DictionaryModule {}
