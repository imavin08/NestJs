import { Injectable, NotFoundException } from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/product.dto';
import { ProductRepository } from 'src/repository/repositories/product.rep';
import { UpdateProductRequest } from './dto/requests';
import { UserRepository } from 'src/repository/repositories/user.rep';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRep: ProductRepository,
    private readonly userRep: UserRepository,
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productRep.getAll();
  }

  async getById(id: string): Promise<Product> {
    return this.productRep.getById(id);
  }

  async create(productDto: CreateProductDto, userId: string): Promise<Product> {
    const user = await this.userRep.findById(userId);
    const product = await this.productRep.create(productDto, userId);
    user.products.push(product);
    user.save();
    return product;
  }

  async remove(id: string, userId: string): Promise<Product> {
    const user = await this.userRep.findById(userId);
    user.products.splice(user.products.indexOf(id), 1);
    user.save();
    return this.productRep.remove(id);
  }

  async update(id: string, productDto: UpdateProductRequest): Promise<Product> {
    const findUser = await this.productRep.getById(id);
    if (!findUser) {
      throw new NotFoundException(`Product with id:"${id}", not found`);
    }
    return this.productRep.update(id, productDto);
  }
}
