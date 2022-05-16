import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO, EditUserDTO } from './user.dto';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(_id: string): Promise<User> {
    const user = await this.userModel.findById(_id);
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async addOne(body: CreateUserDTO): Promise<void> {
    const { _id } = body;
    const existUser = await this.userModel.findById(_id);
    if (existUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }
    await this.userModel.create(body);
  }

  async editOne(_id: string, body: EditUserDTO): Promise<void> {
    const existUser = await this.userModel.findById(_id);
    if (!existUser) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    await this.userModel.findByIdAndUpdate(_id, body);
  }

  async deleteOne(_id: string): Promise<void> {
    const existUser = await this.userModel.findById(_id);
    if (!existUser) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    await this.userModel.findByIdAndDelete(_id);
  }
}
