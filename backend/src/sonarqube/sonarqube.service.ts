import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
        const metric = await this.sonarqubeModel.findOne({id});
        if (!metric) {
            throw new HttpException('Metric not found', HttpStatus.BAD_REQUEST);
        }
        return metric;
    }

    async deleteAll() {
        return this.sonarqubeModel.remove({});
    }

    async deleteOne(id: string) {
        const metric = await this.sonarqubeModel.findOne({id});
        if (!metric) {
            throw new HttpException('Metric not found', HttpStatus.BAD_REQUEST);
        }
        return await this.sonarqubeModel.deleteOne(metric);
    }
}
