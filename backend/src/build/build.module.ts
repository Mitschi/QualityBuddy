import { Module, HttpModule } from '@nestjs/common';
import { BuildService } from './build.service';
import { BuildController } from './build.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildSchema } from '../models/build.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Build', schema: BuildSchema}]), HttpModule],
  providers: [BuildService],
  controllers: [BuildController],
})
export class BuildModule {}
