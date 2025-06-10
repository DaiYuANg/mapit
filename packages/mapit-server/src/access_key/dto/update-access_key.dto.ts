import { PartialType } from '@nestjs/swagger';
import { CreateAccessKeyDto } from './create-access_key.dto';
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccessKeyDto extends PartialType(CreateAccessKeyDto) {
  @ApiProperty({ description: '访问密钥', required: false })
  @IsOptional()
  @IsString()
  key?: string;

  @ApiProperty({ description: '密钥', required: false })
  @IsOptional()
  @IsString()
  secret?: string;

  @ApiProperty({ description: '项目名称', required: false })
  @IsOptional()
  @IsString()
  project_name?: string;
}
