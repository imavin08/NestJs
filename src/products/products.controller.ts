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
import { Product } from './schemas/product.schema';
import {
  ProductRequest,
  UpdateProductRequest,
} from '../products/dto/requests/';
import { ProductResponse } from './dto/responses/product.response';
import { RolesGuard } from 'src/common/guards/roles-guars';
import { Roles } from 'src/common/decorators/roles-decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles()
  @ApiResponse({ type: [ProductResponse] })
  getAll(): Promise<ProductResponse[]> {
    return this.productsService.getAll();
  }

  @Get(':id')
  @ApiResponse({ type: ProductResponse })
  getOne(@Param('id') id: string): Promise<ProductResponse> {
    return this.productsService.getById(id);
  }

  @Post()
  @ApiResponse({ type: ProductResponse })
  create(@Body() createProduct: ProductRequest): Promise<Product> {
    return this.productsService.create(createProduct);
  }

  @Delete(':id')
  @ApiResponse({ type: ProductResponse })
  remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(id);
  }

  @Patch(':id')
  @ApiResponse({ type: ProductResponse })
  update(
    @Body() updateProduct: UpdateProductRequest,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productsService.update(id, updateProduct);
  }
}
