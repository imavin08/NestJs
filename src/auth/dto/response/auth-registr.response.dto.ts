import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { AuthDto } from '../auth.dto';

export class AuthRegResponseDto extends AuthDto {
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsString()
  id: string;
  @ApiProperty()
  products: string[];
}
