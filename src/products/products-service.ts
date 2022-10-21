import { Injectable } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/product.dto';
import { ProductRepository } from 'src/repository/repositories/product.rep';
import { ProductResponse } from './dto/responses/product.response';
import { UpdateProductRequest } from './dto/requests';

@Injectable()
export class ProductService {
  constructor(private readonly productRep: ProductRepository) {}

  async getAll(): Promise<ProductResponse[]> {
    return this.productRep.getAll();
  }

  async getById(id: string): Promise<ProductResponse> {
    return this.productRep.getById(id);
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    return this.productRep.create(productDto);
  }

  async remove(id: string): Promise<Product> {
    return this.productRep.remove(id);
  }

  async update(id: string, productDto: UpdateProductRequest): Promise<Product> {
    return this.productRep.update(id, productDto);
  }
}
