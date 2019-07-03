import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Build } from '../types/build';
import { BuildDTO } from './build.dto';

@Injectable()
export class BuildService {
    constructor(@InjectModel('Build') private buildModel: Model<Build>, private httpService: HttpService) {}

    async findAll(): Promise<Build[]> {
        return this.buildModel.find();
    }

    async fetchBuilds(id: string, token: string) {
        const response = await this.httpService.get(`https://api.travis-ci.org/repo/${id}/builds`, {
            headers: {
                'Authorization': `token ${token}`,
                'Travis-API-Version': 3,
            },
        }).toPromise();

        const builds = await this.editData(response);
        await this.saveValidBuilds(builds);
        return { message: 'Successfully fetched builds' };
    }

    async listBuildsByRepo(id: string) {
        return await this.buildModel.find({repo_id: id});
    }

    private async editData(response): Promise<Build[]> {
        const builds = [];

        await response.data.builds.forEach(element => {
            const build: BuildDTO = {
                number: element.number,
                state: element.state,
                started_at: element.started_at,
                finished_at: element.finished_at,
                duration: element.duration,
                repo_id: element.repository.id,
            };
            builds.push(build);
        });

        return builds;
    }

    private async saveValidBuilds(builds: Build[]) {
        const lastSavedBuild = await this.findAll();

        builds.forEach((build) => {
            if (lastSavedBuild[0] == undefined || lastSavedBuild[0] == null) {
                this.saveBuild(build);
            } else if (build.number > lastSavedBuild[0].number) {
                this.saveBuild(build);
            } else {
                return undefined;
            }
        });
    }

    private async saveBuild(build) {
        const saveBuild = await this.buildModel.create(build);
        saveBuild.save();
    }

    async deleteAll() {
        return this.buildModel.remove({});
    }
}
