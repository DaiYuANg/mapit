import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filter/HttpExceptionFilter';
import { PaginationInterceptor } from './interceptor/PaginationInterceptor';
import compression from 'compression';
import { LoggingInterceptor } from './interceptor/LoggingInterceptor';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      json: process.env.NODE_MODE === 'development',
      prefix: 'mapit',
      timestamp: true,
    }),
  });
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('Map it')
    .setDescription('The mapit API description')
    .setVersion('1.0')
    .addTag('map')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.use(compression());
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new PaginationInterceptor(), new LoggingInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  return app;
};

void bootstrap().then(() => {
  console.log('Server started http://localhost:3000/api');
});
