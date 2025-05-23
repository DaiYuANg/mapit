import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: '项目名' })
  name: string;

  // @ApiProperty({ description: '项目描述' })
  // description?: string;

  // @ApiProperty({ description: '项目编码' })
  // code: string;
  //
  // @ApiProperty({ description: '项目创建者' })
  // creator: string;
  //
  // @ApiProperty({ description: '项目创建时间' })
  // createdAt: Date;
  //
  // @ApiProperty({ description: '项目更新时间' })
  // updatedAt: Date;
  //
  // @ApiProperty({ description: '项目状态' })
  // status: string;
}
