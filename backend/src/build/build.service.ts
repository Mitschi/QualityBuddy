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
import { editBuddyBuildData, editTravisBuildData } from '../shared/editing-builds';

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
        }

        const builds = await this.editingBuildData(response, repo.type, repo.id);
        await this.saveValidBuilds(builds, repo.id);
        return { message: 'Successfully fetched builds' };
    }

    private async editingBuildData(response, type: string, repoId: string): Promise<Build[]> {
        if (type === RepoTypes.TRAVIS) {
            return await editTravisBuildData(response);
        } else if (type === RepoTypes.BUDDY) {
            return await editBuddyBuildData(response, repoId);
        }
    }

    private async saveValidBuilds(builds: Build[], repoId: string) {
        const lastSavedBuild = await this.buildModel.find({repo_id: repoId}).sort({number: -1}).limit(1);
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
