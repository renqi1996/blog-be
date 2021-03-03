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
}
