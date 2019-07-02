import { Module } from '@nestjs/common';
import { BuildService } from './build.service';
import { BuildController } from './build.controller';

@Module({
  providers: [BuildService],
  controllers: [BuildController]
})
export class BuildModule {}
