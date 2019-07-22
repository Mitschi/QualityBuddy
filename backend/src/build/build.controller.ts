import { Controller, Get, Delete, Param } from '@nestjs/common';
import { BuildService } from './build.service';
import { ApiUseTags } from '@nestjs/swagger';
import { Build } from '../types/build';

@ApiUseTags('build')
@Controller('build')
export class BuildController {
    constructor(private buildService: BuildService) {}

    @Get()
    async findAll(): Promise<Build[]> {
        return this.buildService.findAll();
    }

    @Get(':id')
    async getBuildsByRepo(@Param('id') id: string): Promise<Build[]> {
        return this.buildService.listBuildsByRepo(id);
    }

    @Delete()
    async deleteAll() {
        return this.buildService.deleteAll();
    }
}
