import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
  .setTitle("Blog")
  .setDescription("blog api description")
  .setVersion("1.0")
  .addTag("blog")
  .build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
