import { IsString, IsOptional, IsBoolean, IsArray, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccessKeyDto {
  @ApiProperty({ description: '项目ID' })
  @IsString()
  projectId: string;

  @ApiProperty({ description: '是否激活', default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiProperty({ description: '过期时间' })
  @IsOptional()
  @IsDateString()
  expires_at?: Date;

  @ApiProperty({ description: '权限列表', default: ['read'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissions?: string[];

  @ApiProperty({ description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string;
}
