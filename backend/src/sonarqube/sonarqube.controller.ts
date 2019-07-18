import { Controller, Get, Delete, Param } from '@nestjs/common';
import { SonarqubeService } from './sonarqube.service';
import { Sonarqube } from '../types/sonarqube';

@Controller('sonarqube')
export class SonarqubeController {
    constructor(private sonarqubeService: SonarqubeService) {}

    @Get()
    findAll(): Promise<Sonarqube[]> {
        return this.sonarqubeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Sonarqube> {
        return this.sonarqubeService.findOne(id);
    }

    @Delete()
    deleteAll() {
        return this.sonarqubeService.deleteAll();
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return this.sonarqubeService.deleteOne(id);
    }
}
