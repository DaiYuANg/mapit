import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: '用户名', type: String, example: 'admin' })
  @IsString()
  username: string;

  @ApiProperty({ description: '密码', type: String, example: '123456' })
  @IsString()
  @MinLength(6)
  password: string;
}
