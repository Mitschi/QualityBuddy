import { Module } from '@nestjs/common';
import { BuildModule } from './build/build.module';
import { RepoModule } from './repo/repo.module';
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
  controllers: [],
  providers: [],
})
export class AppModule {}
