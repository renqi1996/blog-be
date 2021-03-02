import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../../../schemas/post.schema';
import { PostDto } from '../../dto/post.dto';


@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private postModel: Model<PostDocument>) {}

  async create(createPostDto: PostDto): Promise<Post> {
    const { title, postType, introduction, cover, Tags, Content } = createPostDto;
    const tempParam = {
      title: title,
      postType: postType,
      introduction: introduction,
      cover: cover,
      Tags: Tags,
      Content: Content,
    };
    try {
      const createdPost = new this.postModel(tempParam);
      return createdPost.save();
    } catch (e) {
      throw new HttpException(`Service error: ${e}`, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async delete(id: string): Promise<Post> {
    return await this.postModel.findByIdAndRemove(id);
  }

  async update(id: string, createPostDto: PostDto): Promise<Post> {
    const { title, postType, introduction, cover, Tags, Content } = createPostDto;
    const tempParam = {
      title: title,
      postType: postType,
      introduction: introduction,
      cover: cover,
      Tags: Tags,
      Content: Content,
    };
    try {
      return this.postModel.findByIdAndUpdate(id, tempParam);
    } catch (e) {
      throw new HttpException(`Service error: ${e}`, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async findOne(id: string): Promise<Post> {
    return await this.postModel.findById({ _id: id });
  }

  async findAll(): Promise<Post[]> {
    return await this.postModel.find().exec();
  }
}
