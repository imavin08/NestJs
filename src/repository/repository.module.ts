import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth-service';
import { User, UsersSchema } from 'src/auth/schemas/user.schema';
import { ProductService } from 'src/products/products-service';
import { Product, ProductsSchema } from 'src/products/schemas/product.schema';
import { ProductRepository } from './repositories/product.rep';
import { AuthRepository } from './repositories/auth.rep';
import { UserRepository } from './repositories/user.rep';
import { RoomRepository } from './repositories/room.rep';
import { Room, RoomSchema } from 'src/room/schemas/room.schema';

const providers = [
  ProductRepository,
  AuthRepository,
  UserRepository,
  RoomRepository,
];

const models = [
  { name: User.name, schema: UsersSchema },
  { name: Product.name, schema: ProductsSchema },
  { name: Room.name, schema: RoomSchema },
];

@Module({
  imports: [MongooseModule.forFeature([...models])],
  controllers: [],
  providers,
  exports: [...providers, MongooseModule.forFeature([...models])],
})
export class RepositoryModule {}
