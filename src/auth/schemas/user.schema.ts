import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from "src/products/schemas/product.schema";


export type UserDocument = User & Document;


@Schema()
export class User {

    @Prop()
    email:string

    @Prop()
    password: string

    @Prop()
    token:null | string

    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]})
    products: Product["_id"];

}



export const UsersSchema = SchemaFactory.createForClass(User);