import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repo } from 'src/types/repo';
import { RepoDto } from './repo.dto';
import * as crypto from 'crypto-js';

@Injectable()
export class RepoService {
    constructor(@InjectModel('Repo') private repoModel: Model<Repo>) {}

    async findAll(): Promise<Repo[]> {
        return this.repoModel.find();
    }

    async findOne(id: string): Promise<Repo> {
        return await this.repoModel.findOne({id});
    }

    async create(repoDto: RepoDto): Promise<Repo> {
        const repo = await this.repoModel.findOne({id: repoDto.id});
        if (repo) {
            throw new HttpException('Repo already exists', HttpStatus.BAD_REQUEST);
        }
        const token: string = await crypto.AES.encrypt(repoDto.token, 'token12345678');
        const newRepo = await this.repoModel.create({
            ...repoDto,
            token,
        });
        const token2 = await crypto.AES.decrypt('U2FsdGVkX19njcV0WEL5vY2lKRG4xclG3a74R6SMTbqkUG07RQiJKqGl7Wa8ayN3', 'token12345678');
        return await newRepo.save();
    }

    async deleteAll() {
        return this.repoModel.remove({});
    }

}
