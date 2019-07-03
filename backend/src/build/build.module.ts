import { Module, HttpModule } from '@nestjs/common';
import { BuildService } from './build.service';
import { BuildController } from './build.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildSchema } from '../models/build.schema';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../shared/http-exception.filter';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Build', schema: BuildSchema}]), HttpModule],
  providers: [
    BuildService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  controllers: [BuildController],
})
export class BuildModule {}
