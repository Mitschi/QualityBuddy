import { IsString, IsNumber, IsDate } from 'class-validator';

export class SonarqubeDTO {
    @IsString()
    id: string;
    @IsString()
    name: string;
    @IsNumber()
    violations: number;
    @IsNumber()
    metric: number;
    @IsNumber()
    line_coverage: number;
    @IsNumber()
    files: number;
    @IsNumber()
    ncloc: number;
    @IsNumber()
    bugs: number;
    @IsDate()
    last_commit_date: Date;
    @IsString()
    alert_status: string;
}
