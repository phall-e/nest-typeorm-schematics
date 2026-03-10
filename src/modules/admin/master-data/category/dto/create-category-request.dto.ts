import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt } from "class-validator";

export class CreateCategoryRequestDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code: string;


  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameEn: string;


  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameKh: string;


  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;


  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  createdByUserId: number;

}