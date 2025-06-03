import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessKeyService } from './access_key.service';
import { Request } from 'express';

@Injectable()
export class AccessKeyGuard implements CanActivate {
  constructor(private readonly accessKeyService: AccessKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const accessKey = request.headers['x-access-key'] as string;
    if (!accessKey) throw new UnauthorizedException('缺少 accessKey');
    const valid = await this.accessKeyService.validate(accessKey);
    if (!valid) throw new UnauthorizedException('无效的 accessKey');
    return true;
  }
}
