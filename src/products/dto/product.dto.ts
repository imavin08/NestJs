import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'name' })
  @IsString()
  name: string;

  @ApiProperty()
  phone: number;

  @ApiProperty({ example: 'name@gmail.com' })
  @IsEmail()
  email: string;
}
