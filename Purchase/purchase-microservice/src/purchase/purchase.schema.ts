import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {  HydratedDocument } from "mongoose";
import { Types } from "mongoose";
export type PurchaseDocument = HydratedDocument<Purchase>;
@Schema()
export class Purchase {
    @Prop()
    userId: string

    @Prop()
    productId: string

    @Prop()
    quantity: number

    @Prop()
    total: number

    @Prop()
    status: string

    id:Types.ObjectId
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
