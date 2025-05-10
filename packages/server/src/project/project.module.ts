import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { AccessKeyModule } from '../access_key/access_key.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), AccessKeyModule], // 导入 AccessKeyModule
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
