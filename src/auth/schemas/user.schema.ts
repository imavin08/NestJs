import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';

@Schema()
export class User extends Document {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  token: null | string;

  @Prop()
  status: boolean = false;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }] })
  products: [Product['_id']];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }] })
  friends: [User['id']];
}

export const UsersSchema = SchemaFactory.createForClass(User);
