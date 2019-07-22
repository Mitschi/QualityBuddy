import { Controller, Get, Body, Post, Delete, Param } from '@nestjs/common';
import { RepoService } from './repo.service';
import { Repo } from 'src/types/repo';
import { RepoDto } from './repo.dto';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';

@ApiUseTags('repo')
@Controller('repo')
export class RepoController {
    constructor(private repoService: RepoService) {}

    @ApiResponse({ status: 200, description: 'Successfully fetched all repos'})
    @Get()
    findAll(): Promise<Repo[]> {
        return this.repoService.findAll();
    }

    @ApiResponse({ status: 200, description: 'Successfully fetched repo'})
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Repo> {
        return this.repoService.findOne(id);
    }

    @ApiResponse({ status: 200, description: 'Successfully created repo'})
    @ApiResponse({ status: 400, description: 'BAD REQUEST'})
    @Post()
    createRepo(@Body() repo: RepoDto): Promise<Repo> {
        return this.repoService.create(repo);
    }

    @ApiResponse({ status: 200, description: 'Successfully deleted all repos'})
    @Delete()
    deleteAll() {
        return this.repoService.deleteAll();
    }

    @ApiResponse({ status: 200, description: 'Successfully deleted repo'})
    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return this.repoService.deleteOne(id);
    }
}
