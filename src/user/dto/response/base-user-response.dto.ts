import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { UserDto } from '../user.dto';

export class BaseUserResponse extends UserDto {
  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  id?: string;

  @ApiProperty()
  password: string;

  @Expose()
  @ApiProperty()
  @IsString()
  token: string;
}
