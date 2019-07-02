import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RepoModule } from './repo/repo.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/qualitybuddy'), RepoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
