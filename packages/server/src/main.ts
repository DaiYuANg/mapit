import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'mapit', // Default is "Nest"
    }),
  });
  app.use(compression());
  app.use(helmet());
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  const configService = app.get(ConfigService);
  const port: string | undefined = configService.get('port');
  await app.listen(port ?? 3000);
  return app;
};

void bootstrap().then(() => {
  console.log('Server started on port 3000');
});
