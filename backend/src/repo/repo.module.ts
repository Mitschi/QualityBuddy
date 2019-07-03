import { Module } from '@nestjs/common';
import { RepoService } from './repo.service';
import { RepoController } from './repo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RepoSchema } from '../models/repo.schema';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '../shared/http-exception.filter';
import { LoggingInterceptor } from '../shared/logging.interceptor';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Repo', schema: RepoSchema }])],
  providers: [
    RepoService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  controllers: [RepoController],
})
export class RepoModule {}
