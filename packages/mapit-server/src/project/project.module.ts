import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Project])], // 这一行必须有！
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService], // 如果有需要被其他模块用到
})
export class ProjectModule {}
