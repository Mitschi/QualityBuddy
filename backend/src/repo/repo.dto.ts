import { IsString, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class RepoDto {
    @ApiModelProperty()
    @IsString()
    name: string;
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    id: string;
    @ApiModelProperty()
    @IsString()
    slug: string;
    @ApiModelProperty()
    @IsString()
    href: string;
    @ApiModelProperty()
    @IsString()
    token: string;
    @ApiModelProperty()
    @IsString()
    type: string;
    @ApiModelProperty()
    @IsString()
    workspace: string;
}
