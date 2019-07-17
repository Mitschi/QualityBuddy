import { Injectable, OnModuleInit, OnModuleDestroy, Logger  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Build } from '../types/build';
import { InjectSchedule, Schedule } from 'nest-schedule';
import { RepoService } from '../repo/repo.service';
import * as crypto from 'crypto-js';
import 'dotenv/config';
import { RepoTypes } from '../shared/repo.types';
import { Repo } from '../types/repo';
import { editBuddyBuildData, editTravisBuildData } from '../shared/editing-builds';
import { FetchingService } from '../shared/fetching.service';
import { AxiosResponse } from 'axios';
import { Sonarqube } from '../types/sonarqube';

const FETCHING_TIME: number = 10000;

@Injectable()
export class BuildService implements OnModuleDestroy, OnModuleInit {
    constructor(@InjectModel('Build') private buildModel: Model<Build>,
                @InjectSchedule() private readonly schedule: Schedule,
                private readonly repoService: RepoService,
                private fetchingService: FetchingService) {}

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
            response = await this.fetchingService.fetchTravisBuild(repo, decryptToken);
        } else if (repo.type === RepoTypes.BUDDY) {
            response = await this.fetchingService.fetchBuddyBuild(repo, decryptToken);
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
            if (repo.type === RepoTypes.SONAR) {
                this.fetchCodeMetric(repo);
            } else {
                this.fetchBuilds(repo);
            }
        });
    }

    async fetchCodeMetric(repo: Repo) {
        const decryptToken = await crypto.AES.decrypt(repo.token, process.env.ENCRYPTION_SECRET);
        const response = await this.fetchingService.fetchSonarQubeCodeMetric(repo, decryptToken);
        const metric = await this.editSonarqubeResponse(response);
        this.saveSonarqubeMetric(metric);
    }

    async editSonarqubeResponse(response: AxiosResponse) {
        const measures = response.data.component.measures;

        const sonarqubeMetric: Sonarqube = {
            id: response.data.component.id,
            name: response.data.component.name,
            violations: 0,
            lineCoverage: 0,
            files: 0,
            numberOfLines: 0,
            bugs: 0,
            lastCommitDate: Date.now(),
            status: '',
        };

        measures.forEach(element => {
            sonarqubeMetric[element.metric] = element.value;
        });

        console.log(sonarqubeMetric);
    }

    async saveSonarqubeMetric(metric: Sonarqube) {

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
