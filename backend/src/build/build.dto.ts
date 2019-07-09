import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class BuildDTO {
    @IsString()
    state: string;
    @IsNumber()
    duration: number;
    @IsDate()
    started_at: Date;
    @IsDate()
    finished_at: Date;
    @IsNumber()
    number: number;
    @IsString()
    repo_id: string;
    @IsNotEmpty()
    commit: {
        id: string;
        sha: string;
        message: string;
        committed_at: Date;
    };
}
