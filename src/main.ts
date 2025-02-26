import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './common/utils/logger/logger.config';
import { LoggerService } from './common/utils/logger/logger.service';
import { AllExceptionsFilter } from './common/exception-handling/exception.handle';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerService = app.get(LoggerService);

  app.useGlobalFilters(new AllExceptionsFilter(loggerService))

  await app.listen(3000);
  loggerService.log(`Application is running on: ${await app.getUrl()}`, 'Bootstrap');
}
bootstrap();
