import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DictionaryItem} from "../dictionary_item/entities/dictionary_item.entity";
import {Project} from "./entities/project.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
