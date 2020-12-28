import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  createTime: string;

  @Prop()
  updateTime: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
