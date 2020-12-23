import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findOne(userName: string): string {
    if (userName === 'kid') {
      return 'Kid is here';
    } else {
      return 'No one Here';
    }
  }
}
