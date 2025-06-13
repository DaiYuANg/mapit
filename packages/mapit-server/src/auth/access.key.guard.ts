import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCESS_KEY_REQUIRED } from './access.key.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessKey } from '../access_key/entities/access_key.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { AccessHeader } from '../constant/headers';
import type { CustomRequest } from '../http/request';

@Injectable()
export class AccessKeyGuard implements CanActivate {
  private readonly logger = new Logger(AccessKeyGuard.name, { timestamp: true });

  constructor(
    private reflector: Reflector,
    @InjectRepository(AccessKey)
    private readonly accessKeyRepo: Repository<AccessKey>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 获取方法或类上的元数据，判断是否需要校验
    const accessKeyRequired = this.reflector.getAllAndOverride<boolean>(ACCESS_KEY_REQUIRED, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 如果没标记或者明确跳过，则放行
    if (!accessKeyRequired) {
      return new Promise((resolve) => resolve(true));
    }

    const request = context.switchToHttp().getRequest<CustomRequest>();

    const key = request.header(AccessHeader.AccessKey);
    const secret = request.header(AccessHeader.AccessSecret);
    const projectId = request.header(AccessHeader.ProjectId);
    this.logger.log(`key:${key}`);
    this.logger.log(`secret:${secret}`);
    this.logger.log(`projectId:${projectId}`);
    if (!key || !secret || !projectId) {
      throw new Error('Header missing');
    }

    const accessKey = await this.accessKeyRepo.findOne({
      where: {
        projectId: projectId,
      },
    });

    if (accessKey) {
      const isOk = accessKey.key === key && accessKey.secret === secret;
      this.logger.log(`isok ${isOk}`);
      return new Promise((resolve) => {
        request.projectId = projectId;
        resolve(isOk);
      });
    }

    return new Promise((resolve) => resolve(true));
  }
}
