import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {  HydratedDocument } from "mongoose";
import { Types } from "mongoose";
export type ProductDocument = HydratedDocument<Product>;
@Schema()
export class Product {
    @Prop()
    name: string

    @Prop()
    price: number

    @Prop()
    describe: string

    id:Types.ObjectId
}

export const ProductSchema = SchemaFactory.createForClass(Product);
