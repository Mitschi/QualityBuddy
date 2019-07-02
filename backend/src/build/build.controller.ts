import { Controller, Get, Post, Delete } from '@nestjs/common';
import { BuildService } from './build.service';

@Controller('build')
export class BuildController {
    constructor(private buildService: BuildService) {}

    @Get()
    async findAll() {
        return this.buildService.findAll();
    }

    @Get(':id')
    async getBuild() {
        return this.buildService.fetchBuilds();
    }

    @Delete()
    async deleteAll() {
        return this.buildService.deleteAll();
    }
}
