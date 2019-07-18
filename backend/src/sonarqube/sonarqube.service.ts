import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sonarqube } from '../types/sonarqube';

@Injectable()
export class SonarqubeService {
    constructor(@InjectModel('Sonarqube') private sonarqubeModel: Model<Sonarqube>) {}

    async findAll(): Promise<Sonarqube[]> {
        return this.sonarqubeModel.find();
    }

    async findOne(id: string): Promise<Sonarqube> {
        return await this.sonarqubeModel.findOne({id});
    }

    async deleteAll() {
        return this.sonarqubeModel.remove({});
    }

    async deleteOne(id: string) {
        return this.sonarqubeModel.findByIdAndRemove(id);
    }
}
