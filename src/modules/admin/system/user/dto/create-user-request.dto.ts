import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateUserRequestDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MaxLength(150)
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsOptional()
    isSuperUser?: boolean;

    @ApiProperty()
    @IsOptional()
    isActive?: boolean;
    
}
