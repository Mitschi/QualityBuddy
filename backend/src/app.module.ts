import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuildModule } from './build/build.module';
import { RepoModule } from './repo/repo.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:
  [
    BuildModule,
    RepoModule,
    MongooseModule.forRoot('mongodb://localhost/qualitybuddy'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
