import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';
import { User } from 'src/auth/schemas/user.schema';
import { ProductResponse } from 'src/products/dto/responses/product.response';
import { AuthDto } from '../auth.dto';

export class AuthLogResponse extends AuthDto {
  @Expose()
  @ApiProperty()
  @IsString()
  id?: string;

  @Expose()
  @ApiProperty()
  @IsString()
  password: string;

  @Expose()
  @ApiProperty()
  products: [ProductResponse];

  @Expose()
  @ApiProperty()
  token: string;

  @Expose()
  @ApiProperty()
  status: string;

  @Expose()
  @ApiProperty()
  friends: string[];

  static mapFrom(user: User): AuthLogResponse {
    return plainToClass(AuthLogResponse, user, {
      excludeExtraneousValues: true,
    });
  }
}
