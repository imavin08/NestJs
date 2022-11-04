import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Product } from 'src/products/schemas/product.schema';

@Schema()
export class Room extends Document {
  @Prop()
  id: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }] })
  users: [User['id']];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }] })
  productsUser: [Product['_id']];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
