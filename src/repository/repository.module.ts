import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth-service';
import { User, UsersSchema } from 'src/auth/schemas/user.schema';
import { ProductService } from 'src/products/products-service';
import { Product, ProductsSchema } from 'src/products/schemas/product.schema';
import { ProductRepository } from './repositories/product.rep';
import { AuthRepository } from './repositories/auth.rep';
import { UserRepository } from './repositories/user.rep';

const providers = [
  AuthService,
  ProductService,
  ProductRepository,
  AuthRepository,
  UserRepository,
];

const models = [
  { name: User.name, schema: UsersSchema },
  { name: Product.name, schema: ProductsSchema },
];

@Module({
  imports: [MongooseModule.forFeature([...models])],
  controllers: [],
  providers,
  exports: [...providers, MongooseModule.forFeature([...models])],
})
export class RepositoryModule {}
