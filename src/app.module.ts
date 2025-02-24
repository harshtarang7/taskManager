import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/db.config';
import { LoginModule } from './infrastructure/modules/auth/login.module';
import { ResponseService } from './common/response-manager/response.manager';
import { ResponseInterceptor } from './common/response-manager/response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './infrastructure/modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig()),
    LoginModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService,
    ResponseService,
    {
      provide:APP_INTERCEPTOR,
      useClass:ResponseInterceptor
    }
  ],
  exports:[ResponseService]
})
export class AppModule {}
