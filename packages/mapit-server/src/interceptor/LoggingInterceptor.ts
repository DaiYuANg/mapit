import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const method = request.method;
    const url = request.originalUrl;
    const env = process.env.NODE_ENV || 'development';
    return next.handle().pipe(
      tap(() => {
        const delay = Date.now() - now;
        const status = response.statusCode;
        if (env === 'production') {
          if (status >= 500) {
            this.logger.error(`${status} | [${method}] ${url} - ${delay}ms`);
          } else if (status >= 400) {
            this.logger.warn(`${status} | [${method}] ${url} - ${delay}ms`);
          }
          // 正常响应不打印日志，减少噪声
        } else {
          // 开发环境全部打印
          this.logger.log(`${status} | [${method}] ${url} - ${delay}ms`);
        }
      }),
    );
  }
}
