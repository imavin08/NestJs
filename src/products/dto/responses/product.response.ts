import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateProductDto } from '../product.dto';

export class ProductResponse extends CreateProductDto {
  @ApiProperty()
  @IsString()
  id: string;
}
