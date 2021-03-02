import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../../schemas/user.schema';
import { CreateUserDto } from '../../dto/create-user.dto';
import { makeSalt, encryptPwd } from '../../utils/cryptogram';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { accountName, password, repassword  } = createUserDto;
    if (password !== repassword) {
      throw new HttpException('两次输入的密码不一致', HttpStatus.BAD_REQUEST);
    }
    const user = await this.findOne(accountName);
    if (user) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }
    const salt = makeSalt();
    const hashPwd = encryptPwd(password, salt);
    try {
      const tempParam = {
        accountName: accountName, 
        password: password,
        pwd_salt: hashPwd,
        salt: salt,
      }
      const createdUser = new this.userModel(tempParam);
      return createdUser.save();
    } catch (e) {
      throw new HttpException(`Service error: ${e}`, HttpStatus.SERVICE_UNAVAILABLE);
    }
    
  }

  async findAll(): Promise<User []> {
    return this.userModel.find().exec();
  }

  async findOne(accountName: string): Promise<User> {
    const user = await this.userModel.findOne({ accountName: accountName }).exec();
    return user;
  }
}
