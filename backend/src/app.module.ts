import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuildModule } from './build/build.module';
import { RepoModule } from './repo/repo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { SonarqubeModule } from './sonarqube/sonarqube.module';
import 'dotenv/config';

@Module({
  imports:
  [
    DatabaseModule,
    BuildModule,
    RepoModule,
    SonarqubeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
