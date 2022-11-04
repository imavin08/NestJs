import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsEmail } from 'class-validator';

export class CreateProductDto {
  @Expose()
  @ApiProperty({ example: 'name' })
  @IsString()
  name: string;

  @Expose()
  @ApiProperty()
  phone: number;

  @Expose()
  @ApiProperty({ example: 'name@gmail.com' })
  @IsEmail()
  email: string;
}
