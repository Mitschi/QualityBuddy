import { IsString, IsNotEmpty } from 'class-validator';

export class RepoDto {
    @IsString()
    name: string;
    @IsString()
    @IsNotEmpty()
    id: string;
    @IsString()
    slug: string;
    @IsString()
    href: string;
    @IsString()
    token: string;
}
