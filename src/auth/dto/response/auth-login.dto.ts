import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ProductResponse } from 'src/products/dto/responses/product.response';
import { AuthDto } from '../auth.dto';

export class AuthLogResponseDto extends AuthDto {
  @ApiProperty()
  @IsString()
  id: string;
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty()
  products: [ProductResponse];
  @ApiProperty()
  token: string;
}
