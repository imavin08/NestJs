import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './products-service';
import {
  ProductRequest,
  UpdateProductRequest,
} from '../products/dto/requests/';
import { ProductResponse } from './dto/responses/product.response';
import { RolesGuard } from 'src/common/guards/roles-guars';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpUser } from 'src/common/decorators/http-user.decorator';
import { User } from 'src/auth/schemas/user.schema';

@ApiBearerAuth()
@Controller('products')
@ApiTags('products')
@UseGuards(RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  @ApiResponse({ type: [ProductResponse] })
  async getAll(): Promise<ProductResponse[]> {
    const data = await this.productsService.getAll();

    return ProductResponse.mapFromMulti(data);
  }

  @Get(':id')
  @ApiResponse({ type: ProductResponse })
  async getOne(@Param('id') id: string): Promise<ProductResponse> {
    const data = await this.productsService.getById(id);

    return ProductResponse.mapFrom(data);
  }

  @Post()
  @ApiResponse({ type: ProductResponse })
  async create(
    @Body() createProduct: ProductRequest,
    @HttpUser() user: User,
  ): Promise<ProductResponse> {
    return this.productsService
      .create(createProduct, user.id)
      .then(ProductResponse.mapFrom);
  }

  @Delete(':id')
  @ApiResponse({ type: ProductResponse })
  async remove(
    @Param('id') id: string,
    @HttpUser() user: User,
  ): Promise<ProductResponse> {
    return this.productsService
      .remove(id, user.id)
      .then(ProductResponse.mapFrom);
  }

  @Patch(':id')
  @ApiResponse({ type: ProductResponse })
  async update(
    @Body() updateProduct: UpdateProductRequest,
    @Param('id') id: string,
  ): Promise<ProductResponse> {
    const data = await this.productsService.update(id, updateProduct);
    return ProductResponse.mapFrom(data);
  }
}
