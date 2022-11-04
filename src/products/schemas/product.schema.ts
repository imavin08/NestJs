import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: number;

  @Prop()
  owner: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Product);
