import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessKeyService } from './access_key.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class AccessKeyGuard implements CanActivate {
  constructor(
    private readonly accessKeyService: AccessKeyService,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // 1. 验证 JWT token
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('缺少 JWT token');
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer') {
      throw new UnauthorizedException('无效的 token 类型');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('无效的 JWT token');
    }

    // 2. 验证 Access Key
    const accessKey = request.headers['mapit-access-key'] as string;
    if (!accessKey) {
      throw new UnauthorizedException('缺少 access key');
    }

    const accessKeySecret = request.headers['mapit-access-secret'] as string;
    if (!accessKeySecret) {
      throw new UnauthorizedException('缺少 access secret');
    }

    const keyInfo = await this.accessKeyService.validateWithSecret(accessKey, accessKeySecret);
    if (!keyInfo) {
      throw new UnauthorizedException('无效的 access key 或 secret');
    }

    // 3. 验证权限
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles) {
      const hasPermission = requiredRoles.some((role) => keyInfo.permissions.includes(role));
      if (!hasPermission) {
        throw new UnauthorizedException('权限不足');
      }
    }

    // 4. 更新使用统计
    await this.accessKeyService.updateUsage(keyInfo.id);

    return true;
  }
}
