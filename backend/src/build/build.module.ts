import { Module, HttpModule } from '@nestjs/common';
import { BuildService } from './build.service';
import { BuildController } from './build.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildSchema } from '../models/build.schema';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '../shared/http-exception.filter';
import { LoggingInterceptor } from '../shared/logging.interceptor';
import { ScheduleModule } from 'nest-schedule';
import { RepoModule } from '../repo/repo.module';

@Module({
  imports:
  [
    MongooseModule.forFeature([{name: 'Build', schema: BuildSchema}]),
    HttpModule,
    ScheduleModule.register(),
    RepoModule,
  ],
  providers: [
    BuildService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  controllers: [BuildController],
})
export class BuildModule {}
