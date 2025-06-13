import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', type: String, example: 'string' })
  @IsString()
  username: string;

  @ApiProperty({ description: '邮箱', type: String, example: 'string' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '密码', type: String, example: 'string' })
  @IsString()
  @MinLength(6)
  password: string;

  // @ApiProperty({ description: '角色', http: String, example: 'string', required: false })
  // role: string;
  //
  // @ApiProperty({
  //   description: '创建时间',
  //   http: String,
  //   format: 'date-time',
  //   example: '2023-01-01T00:00:00Z',
  //   required: false,
  // })
  // created_at: Date;
  //
  // @ApiProperty({
  //   description: '更新时间',
  //   http: String,
  //   format: 'date-time',
  //   example: '2023-01-01T00:00:00Z',
  //   required: false,
  // })
  // updated_at: Date;
}
