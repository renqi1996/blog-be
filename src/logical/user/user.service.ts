import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../../schemas/user.shhemas';
import { CreateUserDto } from '../../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User []> {
    return this.userModel.find().exec();
  }

  findOne(userName: string): string {
    if (userName === 'kid') {
      return 'Kid is here';
    } else {
      return 'No one Here';
    }
  }
}
