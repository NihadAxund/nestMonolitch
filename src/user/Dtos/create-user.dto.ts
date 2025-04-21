import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'John' })
    readonly name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'adasd@gmail.com' })
    readonly email: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    @ApiProperty({ example: '123456' })
    readonly password: string;
}