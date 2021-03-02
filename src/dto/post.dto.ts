import {} from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class PostDto {
  @IsNotEmpty({ message: '文章标题不可为空' })
  readonly title: string;

  @IsNotEmpty({ message: '文章类型不可为空' })
  readonly postType: number;

  @IsNotEmpty({ message: '文章简介不可为空' })
  readonly introduction: string;

  @IsNotEmpty({ message: '封面不可为空' })
  readonly cover: string;

  readonly Tags: Array<string>;

  @IsNotEmpty({ message: '文章内容不可为空' })
  readonly Content: string;
}