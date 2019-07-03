import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Build } from '../types/build';
import { BuildDTO } from '../build/build.dto';
import { InjectSchedule, Schedule } from 'nest-schedule';

@Injectable()
export class FetchBuildService {
    constructor(@InjectModel('Build') private buildModel: Model<Build>,
                private httpService: HttpService,
                @InjectSchedule() private readonly schedule: Schedule) {}

    async fetchRepoBuilds() {
        this.schedule.scheduleIntervalJob('fetching-builds', 100000, (): boolean => {
            console.log('fetching builds');
            return true;
        });
    }

    async cancelJob() {
        this.schedule.cancelJob('fetching-builds');
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
}
