import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Build } from '../types/build';
import { BuildDTO } from './build.dto';
import 'dotenv/config';

@Injectable()
export class BuildService {
    constructor(@InjectModel('Build') private buildModel: Model<Build>, private httpService: HttpService) {}

    async findAll(): Promise<Build[]> {
        return this.buildModel.find();
    }

    async fetchBuilds() {
        const response = await this.httpService.get('https://api.travis-ci.org/repo/25171564/builds', {
            headers: {
                'Authorization': `token ${process.env.API_TOKEN}`,
                'Travis-API-Version': 3,

            },
        }).toPromise();

        this.editData(response);
    }

    async editData(response): Promise<Build[]> {
        const builds = [];

        response.data.builds.forEach(element => {
            const build: BuildDTO = {
                number: element.number,
                state: element.state,
                started_at: element.started_at,
                finished_at: element.finished_at,
                duration: element.duration,

            };
            builds.push(build);
            console.log(build);
        });

        return builds;
    }

    async saveBuild(build) {

    }
}
