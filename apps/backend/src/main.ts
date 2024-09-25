import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './exception-filter/prisma';
import { loadSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
      exposedHeaders: ['reload'],
    },
  });
  app.use(cookieParser());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  loadSwagger(app);
  await app.listen(3000);
}
bootstrap();
