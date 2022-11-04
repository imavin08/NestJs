import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from 'src/products/dto/product.dto';
import { UpdateProductRequest } from 'src/products/dto/requests';
import { Product } from 'src/products/schemas/product.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productModel.find();
  }

  async getById(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  async create(productDto: CreateProductDto, id: string): Promise<Product> {
    const newProduct = new this.productModel({ owner: id, ...productDto });
    return newProduct.save();
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id);
  }

  async update(id: string, productDto: UpdateProductRequest): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, productDto, { new: true });
  }
}
