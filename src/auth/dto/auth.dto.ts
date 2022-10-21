import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'example@ex.com' })
  @IsEmail()
  email: string;
}
