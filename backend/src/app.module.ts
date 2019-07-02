import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuildModule } from './build/build.module';
import { RepoModule } from './repo/repo.module';

@Module({
  imports: [BuildModule, RepoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
