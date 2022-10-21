import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { UserService } from 'src/user/user.service';
import { ProductService } from './products-service';
import { ProductsController } from './products.controller';

const providers = [ProductService, UserService];

@Module({
  imports: [RepositoryModule],
  controllers: [ProductsController],
  providers,
  exports: [...providers],
})
export class ProductsModule {}
