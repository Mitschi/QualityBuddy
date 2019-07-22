import { Controller, Get, Delete, Param } from '@nestjs/common';
import { SonarqubeService } from './sonarqube.service';
import { Sonarqube } from '../types/sonarqube';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';

@ApiUseTags('sonarqube')
@Controller('sonarqube')
export class SonarqubeController {
    constructor(private sonarqubeService: SonarqubeService) {}

    @ApiResponse({ status: 200, description: 'Successfully fetched all sonarqube metric informations'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @Get()
    findAll(): Promise<Sonarqube[]> {
        return this.sonarqubeService.findAll();
    }

    @ApiResponse({ status: 200, description: 'Successfully fetch sonarqube metric'})
    @ApiResponse({ status: 400, description: 'Metric not found'})
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Sonarqube> {
        return this.sonarqubeService.findOne(id);
    }

    @ApiResponse({ status: 200, description: 'Successfully deleted all sonarqube metrics'})
    @Delete()
    deleteAll() {
        return this.sonarqubeService.deleteAll();
    }

    @ApiResponse({ status: 200, description: 'Successfully deleted sonarqube metric'})
    @ApiResponse({ status: 400, description: 'Metric could not be deleted'})
    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return this.sonarqubeService.deleteOne(id);
    }
}
