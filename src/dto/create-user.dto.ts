import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly accountName: string;

  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;

  @IsNotEmpty({ message: '重复密码不能为空' })
  readonly repassword: string;
}