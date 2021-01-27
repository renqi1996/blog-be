import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import * as express  from 'express';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { AllExceptionsFilter } from './filter/any-exception.filter.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // app.useGlobalInterceptors(new TransformInterceptor());
  app.use(logger);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new AllExceptionsFilter());

  const corsOptions = { 
    origin(origin, callback) {
      callback(null, true);
    },
    credentials: true
  };

  app.enableCors(corsOptions);
  await app.listen(3000);
}
bootstrap();
