import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../../dto/create-user.dto'

@Controller('user')
export class UserController {
  constructor (private readonly usersService: UserService) {}

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
