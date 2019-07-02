import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Build } from '../types/build';
import { AxiosResponse } from 'axios';
import 'dotenv/config';

@Injectable()
export class BuildService {
    constructor(@InjectModel('Build') private buildModel: Model<Build>, private httpService: HttpService) {}

    async findAll(): Promise<Build[]> {
        return this.buildModel.find();
    }

    async createObject() {
        const response = await this.httpService.get('https://api.travis-ci.org/repo/25171564/builds', {
            headers: {
                "Authorization": `token ${process.env.API_TOKEN}`,
                'Travis-API-Version': 3,

            },
        }).toPromise();
        console.dir(response.data);
    }
}
