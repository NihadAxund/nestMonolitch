import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @ApiProperty({ example: 'Product_Name' })
    name:string;
}