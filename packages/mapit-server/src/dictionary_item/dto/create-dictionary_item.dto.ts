import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateDictionaryItemDto {
  @ApiProperty({ description: '字典项名称' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '字典项编码' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: '字典项描述', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: '排序值' })
  @IsNumber()
  sort: number;

  @ApiProperty({ description: '所属字典ID' })
  @IsString()
  @IsNotEmpty()
  dictionaryId: string;
}
