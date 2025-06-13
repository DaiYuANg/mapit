import { ApiProperty } from '@nestjs/swagger';
import { ProjectType } from '../project.type';

export class CreateProjectDto {
  @ApiProperty({ description: '项目名' })
  name: string;

  @ApiProperty({ description: '项目类型' })
  projectType: ProjectType;

  @ApiProperty({ description: '项目描述' })
  description?: string;

  @ApiProperty({ description: '项目编码' })
  code: string;
}
