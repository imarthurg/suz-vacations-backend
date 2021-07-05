import 'reflect-metadata';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './modules/shared/services/config.service';

const port = process.env.PORT || 3000;

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: configService.cors,
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => Logger.log(`Application started. port ${port}`));
}

bootstrap();
