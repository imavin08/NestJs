import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class AuthDto {
  @Expose()
  @ApiProperty({ example: 'example@ex.com' })
  @IsEmail()
  email: string;
}
