import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Dictionary } from '../dictionary/entities/dictionary.entity';
import { DictionaryItem } from '../dictionary_item/entities/dictionary_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Dictionary, DictionaryItem])],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService], // 如果有需要被其他模块用到
})
export class ProjectModule {}
