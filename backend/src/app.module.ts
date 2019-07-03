import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuildModule } from './build/build.module';
import { RepoModule } from './repo/repo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [BuildModule, RepoModule, MongooseModule.forRoot('mongodb://localhost/qualitybuddy')],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
