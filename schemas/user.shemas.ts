import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop()
  accountName: string;

  @Prop()
  password: string;

  @Prop()
  pwd_salt: string;

  @Prop()
  salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
