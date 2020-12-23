import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('user')
export class UserController {
  constructor (private readonly usersService: UserService) {}

  @Post('findOne')
  findOne(@Body() body: any) {
    return this.usersService.findOne(body.userName);
  }
}
