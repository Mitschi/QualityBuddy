import { Module } from '@nestjs/common';
import { SonarqubeController } from './sonarqube.controller';
import { SonarqubeService } from './sonarqube.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SonarqubeSchema } from '../models/sonarqube.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Sonarqube', schema: SonarqubeSchema}])],
  controllers: [SonarqubeController],
  providers: [SonarqubeService],
})
export class SonarqubeModule {}
