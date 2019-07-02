import { Controller, Get } from '@nestjs/common';
import { BuildService } from './build.service';

@Controller('build')
export class BuildController {
    constructor(private buildService: BuildService) {}

    @Get()
    async findAll() {
        return this.buildService.findAll();
    }
}
