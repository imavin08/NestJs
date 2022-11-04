import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { UserDto } from '../user.dto';

export class UserRequest extends UserDto {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsString()
  file?: string;

  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
