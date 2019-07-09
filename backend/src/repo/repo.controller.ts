import { Controller, Get, Body, Post, Delete, Param } from '@nestjs/common';
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

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Repo> {
        return this.repoService.findOne(id);
    }

    @Post()
    createRepo(@Body() repo: RepoDto): Promise<Repo> {
        return this.repoService.create(repo);
    }

    @Delete()
    deleteAll() {
        return this.repoService.deleteAll();
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return this.repoService.deleteOne(id);
    }
}
