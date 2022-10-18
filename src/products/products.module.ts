import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from "./products-service";
import { ProductsController } from "./products.controller";
import { Product, ProductsSchema } from "./schemas/product.schema";

@Module({
    providers: [ProductService],
    controllers:[ProductsController],
     imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductsSchema }])],
})

export class ProductsModule {
    
}