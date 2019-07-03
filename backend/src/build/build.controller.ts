import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { BuildService } from './build.service';

@Controller('build')
export class BuildController {
    constructor(private buildService: BuildService) {}

    @Get()
    async findAll() {
        return this.buildService.findAll();
    }

    @Get(':id')
    async getBuildsByRepo(@Param('id') id: string) {
        return this.buildService.listBuildsByRepo(id);
    }

    @Delete()
    async deleteAll() {
        return this.buildService.deleteAll();
    }
}
