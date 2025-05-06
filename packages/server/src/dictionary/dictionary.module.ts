import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Dictionary} from "./entities/dictionary.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Dictionary])],
  controllers: [DictionaryController],
  providers: [DictionaryService],
})
export class DictionaryModule {}
