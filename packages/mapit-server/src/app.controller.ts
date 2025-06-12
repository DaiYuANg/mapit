import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/public.decorator';
import { CacheKey } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/v1/projects/:projectId/dictionaries/:dictCode/mapping/:itemValue')
  @Public()
  @CacheKey('label')
  async queryLabel(
    @Param('projectId') projectId: string,
    @Param('dictCode') dictCode: string,
    @Param('itemValue') itemValue: string,
  ) {
    return this.appService.queryLabel(projectId, dictCode, itemValue);
  }
}
