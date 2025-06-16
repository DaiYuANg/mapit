import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCESS_KEY_REQUIRED } from './access.key.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessKey } from '../access_key/entities/access_key.entity';
import { Repository } from 'typeorm';
import { AccessHeader } from '../constant/headers';
import type { CustomRequest } from '../http/request';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

type AccessCacheObj = Pick<AccessKey, 'key' | 'secret'>;

@Injectable()
export class AccessKeyGuard implements CanActivate {
  private readonly logger = new Logger(AccessKeyGuard.name, { timestamp: true });
  private readonly CACHE_TTL_SECONDS = 6 * 32 * 32; // 约6小时

  constructor(
    private reflector: Reflector,
    @InjectRepository(AccessKey)
    private readonly accessKeyRepo: Repository<AccessKey>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const accessKeyRequired = this.reflector.getAllAndOverride<boolean>(ACCESS_KEY_REQUIRED, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!accessKeyRequired) {
      return true;
    }

    const request = context.switchToHttp().getRequest<CustomRequest>();
    const key = request.header(AccessHeader.AccessKey);
    const secret = request.header(AccessHeader.AccessSecret);
    const projectId = request.header(AccessHeader.ProjectId);

    if (!key || !secret || !projectId) {
      this.logger.warn(`Missing required headers: key=${!!key}, secret=${!!secret}, projectId=${!!projectId}`);
      throw new Error('Header missing');
    }

    // 尝试从缓存读取
    let accessKey = await this.cacheManager.get<AccessCacheObj>(projectId);

    if (!accessKey) {
      // 缓存没命中，查询数据库
      const entity = await this.accessKeyRepo.findOne({ where: { projectId } });
      if (!entity) {
        this.logger.warn(`AccessKey not found for projectId: ${projectId}`);
        return false;
      }
      accessKey = { key: entity.key, secret: entity.secret };

      await this.cacheManager.set(projectId, accessKey, this.CACHE_TTL_SECONDS);
    }

    // 校验 key 和 secret 是否匹配
    const isValid = accessKey.key === key && accessKey.secret === secret;
    this.logger.log(`AccessKey validation result: ${isValid} for projectId: ${projectId}`);

    if (isValid) {
      request.projectId = projectId;
    }

    return isValid;
  }
}
