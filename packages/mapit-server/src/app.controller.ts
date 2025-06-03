import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/v1/projects/:projectId/dictionaries/:dictCode/mapping')
  queryLabel(
    @Param(':projectId') projectId: string,
    @Param(':dictCode') dictCode: string,
    @Query('itemValue') itemValue: string,
  ): string {
    return this.appService.queryLabel(projectId, dictCode, itemValue);
  }
}
