import { Injectable, HttpService, OnModuleInit, OnModuleDestroy, Logger  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Build } from '../types/build';
import { BuildDTO } from './build.dto';
import { InjectSchedule, Schedule } from 'nest-schedule';
import { RepoService } from '../repo/repo.service';
import * as crypto from 'crypto-js';
import 'dotenv/config';
import { RepoTypes } from '../shared/repo.types';
import { Repo } from '../types/repo';

const FETCHING_TIME: number = 10000;

@Injectable()
export class BuildService implements OnModuleDestroy, OnModuleInit {
    constructor(@InjectModel('Build') private buildModel: Model<Build>,
                @InjectSchedule() private readonly schedule: Schedule,
                private httpService: HttpService,
                private readonly repoService: RepoService) {}

    onModuleInit() {
        this.startBuildFetching();
    }

    onModuleDestroy() {
        this.cancelBuildFetching();
    }

    private async startBuildFetching() {
        this.schedule.scheduleIntervalJob('fetching-builds', FETCHING_TIME , (): boolean => {
            this.getRepositoryIdsAndToken();
            return false;
        });
    }

    private async cancelBuildFetching() {
        this.schedule.cancelJob('fetching-builds');
    }

    private async fetchBuilds(repo: Repo) {
        const decryptToken = await crypto.AES.decrypt(repo.token, process.env.ENCRYPTION_SECRET);
        let response;
        if (repo.type === RepoTypes.TRAVIS) {
            response = await this.httpService.get(`https://api.travis-ci.org/repo/${repo.id}/builds`, {
            headers: {
                'Authorization': `token ${decryptToken.toString(crypto.enc.Utf8)}`,
                'Travis-API-Version': 3,
            },
            }).toPromise();
        } else if (repo.type === RepoTypes.BUDDY) {
            response = await this.httpService.get(
                `https://api.buddy.works/workspaces/${repo.workspace}/projects/${repo.name}/pipelines/${repo.id}/executions`, {
                headers: {
                    'Authorization': `Bearer ${decryptToken.toString(crypto.enc.Utf8)}`,
                    'Content-Type': 'application/json',
                },
            }).toPromise();
            console.log(response.data);
        }

        const builds = await this.editingBuildData(response);
        await this.saveValidBuilds(builds);
        return { message: 'Successfully fetched builds' };
    }

    private async editingBuildData(response): Promise<Build[]> {
        const builds = [];

        await response.data.builds.forEach(element => {
            const build: BuildDTO = {
                number: element.number,
                state: element.state,
                started_at: element.started_at,
                finished_at: element.finished_at,
                duration: element.duration,
                repo_id: element.repository.id,
                commit: {
                    id: element.commit.id,
                    message: element.commit.message,
                    committed_at: element.commit.committed_at,
                    sha: element.commit.sha,
                },
            };
            builds.push(build);
        });

        return builds;
    }

    private async saveValidBuilds(builds: Build[]) {
        const lastSavedBuild = await this.buildModel.find().sort({number: -1}).limit(1);

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

    async getRepositoryIdsAndToken() {
        Logger.log('Fetching Repo builds', 'getRepositories');
        const repos = await this.repoService.findAll();
        repos.forEach((repo) => {
            this.fetchBuilds(repo);
        });
    }

    async findAll(): Promise<Build[]> {
        return this.buildModel.find();
    }

    async listBuildsByRepo(id: string) {
        return await this.buildModel.find({repo_id: id});
    }

    async deleteAll() {
        return this.buildModel.remove({});
    }
}
