// common/filters/http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const timestamp = new Date().toISOString();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
      message = typeof res === 'string' ? res : (res as any).message || (res as any).error || message;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.logger.error(`[${request.method}] ${request.url} → ${status} ${message}`, (exception as any).stack);

    response.status(status).json({
      statusCode: status,
      timestamp,
      path: request.url,
      message,
    });
  }
}
