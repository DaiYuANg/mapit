import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDictionaryDto {
  @ApiProperty({ description: '字典名称' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '字典编码' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: '字典描述', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: '所属项目ID' })
  @IsString()
  @IsNotEmpty()
  projectId: string;
}
