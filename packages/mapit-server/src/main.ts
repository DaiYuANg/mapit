import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Map it')
    .setDescription('The mapit API description')
    .setVersion('1.0')
    .addTag('map')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.use(compression());
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap().then(() => {
  console.log('Server started http://localhost:3000/api');
});
