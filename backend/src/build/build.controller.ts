import { Controller, Get, Delete, Param } from '@nestjs/common';
import { BuildService } from './build.service';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { Build } from '../types/build';

@ApiUseTags('build')
@Controller('build')
export class BuildController {
    constructor(private buildService: BuildService) {}

    @ApiResponse({ status: 200, description: 'Successfully fetched all builds'})
    @Get()
    async findAll(): Promise<Build[]> {
        return this.buildService.findAll();
    }

    @ApiResponse({ status: 200, description: 'Successfully fetched build'})
    @Get(':id')
    async getBuildsByRepo(@Param('id') id: string): Promise<Build[]> {
        return this.buildService.listBuildsByRepo(id);
    }

    @ApiResponse({ status: 200, description: 'Deleted all builds'})
    @Delete()
    async deleteAll() {
        return this.buildService.deleteAll();
    }
}
