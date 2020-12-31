import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../../dto/create-user.dto'
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor (
    private readonly usersService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() loginParams: any) {
    console.log('JWT验证 - Step 1: 用户请求登录');

    const authResult = await this.authService.validateUser(
      loginParams.accountName,
      loginParams.password,
    );

    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
        break;
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }

  @Post('findOne')
  findOne(@Body() body: any) {
    return this.usersService.findOne(body.userName);
  }

  @Post('createUser')
  async createUser(@Res() res, @Body() body: CreateUserDto) {
    const newUser = await this.usersService.create(body);
    return res.status(HttpStatus.OK).json({
      message: "New User has been submitted successfully!",
      post: newUser,
    });
  }

  @Get('findAll')
  findAll() {
    return this.usersService.findAll();
  }
}
