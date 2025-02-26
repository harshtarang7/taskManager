import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/db.config';
import { LoginModule } from './infrastructure/modules/auth/login.module';
import { ResponseService } from './common/response-manager/response.manager';
import { ResponseInterceptor } from './common/response-manager/response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './infrastructure/modules/user/user.module';
import { LoggerModule } from './common/utils/logger/logger.module';
import { LoggerService } from './common/utils/logger/logger.service';
import { TypeOrmLogger } from './common/utils/logger/typeorm.logger';
import { LoggerMiddlerware } from './common/utils/logger/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [LoggerModule],
      inject: [LoggerService],
      useFactory: (loggerService: LoggerService) => {
        const config = dbConfig();
        return{
          ...config,
          logger: new TypeOrmLogger(loggerService),
          logging: true,
        }
      },
    }),
    LoginModule,
    UserModule,
    LoggerModule,
   
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ResponseService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
  exports: [ResponseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddlerware).forRoutes('*');
  }
}
