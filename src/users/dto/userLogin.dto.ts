import { IsString, Length } from 'class-validator';

export class UserPipesDto {
    @IsString()
    @Length(6, 20, {message: '长度不合法'})
    readonly username: string;
    @Length(1)
    readonly password: string;
}