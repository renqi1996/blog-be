import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from '../../pipe/validation.pipe';
import { PostDto } from '../../dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor (
    private readonly postService: PostService,
    private readonly authService: AuthService,
  ) {}

  // @UseGuards(AuthGuard('jwt'))
  // @UsePipes(new ValidationPipe())
  @Post('queryPosts')
  async queryPosts(@Res() res, @Body() body: any) {
    const Posts = await this.postService.findAll();
    return res.status(HttpStatus.OK).json({
      message: "success",
      post: Posts,
    });
  }

  @Post('queryPostByID')
  async queryPostByID(@Res() res, @Body() body: any) {
    const Post = await this.postService.findOne(body.id);
    return res.status(HttpStatus.OK).json({
      message: "success",
      post: Post,
    });
  }

  @Post('savePost')
  async savePost(@Res() res, @Body() body:PostDto) {
    const newPost = await this.postService.create(body);
    return res.status(HttpStatus.OK).json({
      message: "post has been saved successfully!",
      post: newPost,
    });
  }

  @Post('modifyPost')
  async modifyPost(@Res() res, @Body() body: { id: string, post: PostDto }) {
    const newPost = await this.postService.update(body.id, body.post);
    return res.status(HttpStatus.OK).json({
      message: "Post has been modified successfully!",
      post: newPost,
    });
  }

  @Post('deletPost')
  async deletePost(@Res() res, @Body() body: any) {
    const newPost = await this.postService.delete(body.id);
    return res.status(HttpStatus.OK).json({
      message: "Post has been deleted successfully!",
      post: newPost,
    });
  }

}
