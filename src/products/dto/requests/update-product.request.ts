import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from '../product.dto';

export class UpdateProductRequest extends PartialType(CreateProductDto) {}
