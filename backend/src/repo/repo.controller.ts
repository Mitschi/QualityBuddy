import { Controller, Get, Body, Post } from '@nestjs/common';
import { RepoService } from './repo.service';
import { Repo } from 'src/types/repo';
import { RepoDto } from './repo.dto';

@Controller('repo')
export class RepoController {
    constructor(private repoService: RepoService) {}

    @Get()
    findAll(): Promise<Repo[]> {
        return this.repoService.findAll();
    }

    @Post()
    createRepo(@Body() repo: RepoDto): Promise<Repo> {
        return this.repoService.create(repo);
    }
}
