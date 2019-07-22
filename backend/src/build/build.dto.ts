import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class BuildDTO {
    @ApiModelProperty()
    @IsString()
    state: string;
    @ApiModelProperty()
    @IsNumber()
    duration: number;
    @ApiModelProperty()
    @IsDate()
    started_at: Date;
    @ApiModelProperty()
    @IsDate()
    finished_at: Date;
    @ApiModelProperty()
    @IsNumber()
    number: number;
    @ApiModelProperty()
    @IsString()
    repo_id: string;
    @ApiModelProperty()
    @IsNotEmpty()
    commit: {
        id: string;
        sha: string;
        message: string;
        committed_at: Date;
    };
}
