import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheKey } from '@nestjs/cache-manager';
import { ApiHeader } from '@nestjs/swagger';
import { AccessHeader } from './constant/headers';
import { AccessKey } from './auth/access.key.decorator';
import { AccessKeyGuard } from './auth/access.key.guard';
import { Public } from './auth/public.decorator';
import type { CustomRequest } from './http/request';

@Controller()
@UseGuards(AccessKeyGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/v1/projects/:projectId/dictionaries/:dictCode/mapping/:itemValue')
  @AccessKey()
  @Public()
  @CacheKey('label')
  @ApiHeader({
    name: AccessHeader.AccessKey,
    description: 'access key header',
    required: true,
  })
  @ApiHeader({
    name: AccessHeader.AccessSecret,
    description: 'access secret header',
    required: true,
  })
  @ApiHeader({
    name: AccessHeader.ProjectId,
    description: 'access secret header',
    required: true,
  })
  async queryLabel(
    @Param('dictCode') dictCode: string,
    @Param('itemValue') itemValue: string,
    @Req() req: CustomRequest,
  ) {
    return this.appService.queryLabel(req.projectId!, dictCode, itemValue);
  }
}
