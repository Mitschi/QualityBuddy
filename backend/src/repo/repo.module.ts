import { Module } from '@nestjs/common';
import { RepoService } from './repo.service';
import { RepoController } from './repo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RepoSchema } from '../models/repo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Repo', schema: RepoSchema }])],
  providers: [
    RepoService,
  ],
  controllers: [RepoController],
  exports: [RepoService],
})
export class RepoModule {}
