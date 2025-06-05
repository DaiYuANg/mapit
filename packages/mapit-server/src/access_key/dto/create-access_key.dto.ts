import { IsNotEmpty, IsOptional, IsBoolean, IsString } from 'class-validator';

export class CreateAccessKeyDto {
  @IsNotEmpty({ message: 'projectId 不能为空' })
  @IsString()
  projectId: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsString()
  remark?: string;
}
