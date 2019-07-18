import { IsString, IsNumber, IsDate } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class SonarqubeDTO {
    @ApiModelProperty()
    @IsString()
    id: string;
    @ApiModelProperty()
    @IsString()
    name: string;
    @ApiModelProperty()
    @IsNumber()
    violations: number;
    @ApiModelProperty()
    @IsNumber()
    metric: number;
    @ApiModelProperty()
    @IsNumber()
    line_coverage: number;
    @ApiModelProperty()
    @IsNumber()
    files: number;
    @ApiModelProperty()
    @IsNumber()
    ncloc: number;
    @ApiModelProperty()
    @IsNumber()
    bugs: number;
    @ApiModelProperty()
    @IsDate()
    last_commit_date: Date;
    @ApiModelProperty()
    @IsString()
    alert_status: string;
}
