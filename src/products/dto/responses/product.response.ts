import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';
import { Product } from 'src/products/schemas/product.schema';
import { CreateProductDto } from '../product.dto';

export class ProductResponse extends CreateProductDto {
  @Expose()
  @ApiProperty()
  @IsString()
  id: string;

  @Expose()
  @ApiProperty()
  @IsString()
  owner: string;

  static mapFrom(product: Product): ProductResponse {
    return plainToClass(ProductResponse, product, {
      excludeExtraneousValues: true,
    });
  }

  static mapFromMulti(products: Product[]): ProductResponse[] {
    return products.map(ProductResponse.mapFrom);
  }
}
