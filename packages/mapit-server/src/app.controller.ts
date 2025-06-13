import { Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/public.decorator';
import { CacheKey } from '@nestjs/cache-manager';
import { ApiHeader } from '@nestjs/swagger';
import { ACCESS_KEY_HEADER } from './constant/headers';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/v1/projects/:projectId/dictionaries/:dictCode/mapping/:itemValue')
  @Public()
  @CacheKey('label')
  @ApiHeader({
    name: ACCESS_KEY_HEADER, // 你自定义的请求头名字
    description: 'access key header',
    required: true,
  })
  async queryLabel(
    @Param('projectId') projectId: string,
    @Param('dictCode') dictCode: string,
    @Param('itemValue') itemValue: string,
    @Req() req: Request,
  ) {
    console.log(req.headers);
    return this.appService.queryLabel(projectId, dictCode, itemValue);
  }
}
