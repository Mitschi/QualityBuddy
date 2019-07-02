import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Build } from '../types/build';

@Injectable()
export class BuildService {
    constructor(@InjectModel('Build') private buildModel: Model<Build>) {}

    async findAll(): Promise<Build[]> {
        return this.buildModel.find();
    }
}
