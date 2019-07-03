import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repo } from 'src/types/repo';
import { RepoDto } from './repo.dto';

@Injectable()
export class RepoService {
    constructor(@InjectModel('Repo') private repoModel: Model<Repo>) {}

    async findAll(): Promise<Repo[]> {
        return this.repoModel.find();
    }

    async create(repoDto: RepoDto): Promise<Repo> {
        const newRepo = await this.repoModel.create(repoDto);
        return await newRepo.save();
    }
}
