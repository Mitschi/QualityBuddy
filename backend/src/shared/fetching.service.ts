import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import * as crypto from 'crypto-js';
import { Repo } from '../types/repo';

@Injectable()
export class FetchingService {
    constructor(private httpService: HttpService) {}

    async fetchTravisBuild(repo: Repo, decryptToken): Promise<AxiosResponse> {
        return await this.httpService.get(`https://api.travis-ci.org/repo/${repo.id}/builds`, {
            headers: {
                'Authorization': `token ${decryptToken.toString(crypto.enc.Utf8)}`,
                'Travis-API-Version': 3,
            },
            }).toPromise();
    }

    async fetchBuddyBuild(repo: Repo, decryptToken): Promise<AxiosResponse> {
        return await this.httpService.get(
            `https://api.buddy.works/workspaces/${repo.workspace}/projects/${repo.name}/pipelines/${repo.id}/executions`, {
            headers: {
                'Authorization': `Bearer ${decryptToken.toString(crypto.enc.Utf8)}`,
                'Content-Type': 'application/json',
            },
        }).toPromise();
    }

    async fetchSonarQubeCodeMetric(repo: Repo, decryptToken): Promise<AxiosResponse> {
        console.log('Fetching build');
        return await this.httpService.get(
            `http://${repo.workspace}:9000/api/measures/component?metricKeys=ncloc,complexity,violations&componentKey=${repo.name}`, {
            headers: {
                'Authorization': `Basic ${decryptToken.toString(crypto.enc.Utf8)}`,
                'Content-Type': 'application/json',
            },
        }).toPromise();
    }
}
