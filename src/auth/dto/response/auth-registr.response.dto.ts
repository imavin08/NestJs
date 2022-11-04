import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';
import { User } from 'src/auth/schemas/user.schema';
import { AuthDto } from '../auth.dto';

export class AuthRegResponse extends AuthDto {
  @Expose()
  @ApiProperty()
  @IsString()
  password: string;

  @Expose()
  @ApiProperty()
  @IsString()
  id?: string;

  @Expose()
  @ApiProperty()
  products: string[];

  @Expose()
  @ApiProperty()
  friends: string[];

  static mapFrom(user: User): AuthRegResponse {
    return plainToClass(AuthRegResponse, user, {
      excludeExtraneousValues: true,
    });
  }
}
