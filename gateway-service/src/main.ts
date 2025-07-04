import { NestFactory } from '@nestjs/core';
import { AppModule }   from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());  // если вы хотите валидацию DTO

  const config = new DocumentBuilder()
      .setTitle('Gateway Service API')
      .setDescription('API gateway with ToDo management')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
