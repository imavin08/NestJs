import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AuthDto } from '../auth.dto';

export class AuthRequestDto extends AuthDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
