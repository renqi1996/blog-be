import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { Post, PostSchema } from '../../../schemas/post.schema';
import { MongooseModule } from '@nestjs/mongoose';
// import { PostController } from './post.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
  providers: [PostService],
  // controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
