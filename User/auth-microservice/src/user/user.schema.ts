import { Type } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';
import { Role } from 'src/role/role.enum';
export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {

    @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: Role, default: Role.User })
  role: Role; // Thêm thuộc tính role

    id:Types.ObjectId
}
export const UserSchema = SchemaFactory.createForClass(User);