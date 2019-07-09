import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repo } from 'src/types/repo';
import { RepoDto } from './repo.dto';
import * as crypto from 'crypto-js';
import 'dotenv/config';

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
        const token: string = await crypto.AES.encrypt(repoDto.token, process.env.ENCRYPTION_SECRET);
        const newRepo = await this.repoModel.create({
            ...repoDto,
            token,
        });
        return await newRepo.save();
    }

    async deleteAll() {
        return this.repoModel.remove({});
    }

}
