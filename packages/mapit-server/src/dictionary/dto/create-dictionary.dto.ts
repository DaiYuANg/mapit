import { ApiProperty } from '@nestjs/swagger';

export class CreateDictionaryDto {
  @ApiProperty({ description: '字典名称' })
  name: string;

  @ApiProperty({ description: '字典编码' })
  code: string;

  @ApiProperty({ description: '字典描述', required: false })
  description?: string;

  @ApiProperty({ description: '项目ID' })
  projectId: string;
}
