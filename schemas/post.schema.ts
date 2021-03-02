import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post extends Document {
  @Prop()
  title: string;

  @Prop()
  postType: number;

  @Prop()
  introduction: string;

  @Prop()
  cover: string;

  @Prop()
  Tags: Array<string>;

  @Prop()
  Content: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);