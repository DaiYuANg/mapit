import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from 'express';
interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
}
@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res: Response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((result: unknown) => {
        // 用类型保护断言 result 是 PaginatedResponse
        if (
          typeof result === 'object' &&
          result !== null &&
          'total' in result &&
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          typeof (result as any).total === 'number'
        ) {
          const paginated = result as PaginatedResponse;
          res.setHeader('x-total-count', paginated.total);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return paginated.data;
        }

        return result;
      }),
    );
  }
}
