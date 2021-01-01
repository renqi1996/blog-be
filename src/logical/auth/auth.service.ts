import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPwd } from '../../utils/cryptogram';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // JWT step 2
  async validateUser (userName: string, password: string): Promise<any> {
    console.log('JWT Step 2');
    const user = await this.userService.findOne(userName);
    if (user) {
      const hashedPwd = user[0].pwd_salt;
      const salt = user[0].salt;
      const hashPwd = encryptPwd(password, salt);

      if (hashPwd === hashedPwd) {
        // correct pwd
        return {
          code: 1,
          user,
        };
      } else {
        // error pwd
        return {
          code: 2,
          user: null,
        };
      }
    } else {
      // cannot find
      return {
        code: 3,
        user: null,
      };
    }
  }

  // JWT step 3
  async certificate(user: any) {
    const payload = {
      username: user.accountName,
      sub: user._id,
    };
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign(payload);
      return {
        code: 200,
        data: {
          token,
        },
        msg: `登录成功`,
      };
    } catch (e) {
      return {
        code: 600,
        msg: `账号或密码错误`,
      };
    }
  }
}
