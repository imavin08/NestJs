import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import {User} from '../../auth/schemas/user.schema'


@Schema()
export class Product extends Document {

    @Prop()
    name:string

    @Prop()
    email:string

    @Prop()
    number: number

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    owner: User;


}

export const ProductsSchema = SchemaFactory.createForClass(Product);