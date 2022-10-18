import { Body, Controller,Delete,Get, Param, Post, Put, Headers} from '@nestjs/common';
import * as jsonwebtoken from "jsonwebtoken"
import { UnauthorizedException } from "@nestjs/common";

import { ProductService } from './products-service';
import { Product } from "./schemas/product.schema";
import { CreateProductRequest } from './dto/requests/create-product.request';
import { ProductResponse } from './dto/responses/product.response';
import { UpdateProductRequest } from './dto/requests/update-product.request';


@Controller('products')
export class ProductsController {

    constructor(private readonly productsService:ProductService) {

    }

    @Get()
    getAll(@Headers() query):Promise<ProductResponse[]> {
        if (!query.authorization) {
            throw new UnauthorizedException('Not authorized')
        }
        const [type,token]=query.authorization.split(' ')
       if (type !== "Bearer" && !token) {
        throw new UnauthorizedException('Not authorized')
       }
       const user = jsonwebtoken.decode(token, process.env.JWT_SECRET)
       console.log(user);
       
       
        return this.productsService.getAll(user)
    }

    @Get(':id')
    getOne(@Param('id') id:string):Promise<ProductResponse> {
        return this.productsService.getById(id)
    }

    @Post()
    create(@Body() createProduct:CreateProductRequest):Promise<Product> {
        return this.productsService.create(createProduct)
    }

    @Delete(':id')
    remove(@Param('id') id:string):Promise<Product> {
        return this.productsService.remove(id)
    }

    @Put(':id')
    update(@Body() updateProduct:UpdateProductRequest,@Param('id') id:string):Promise<Product> {
        return this.productsService.update(id,updateProduct)
    }
}
