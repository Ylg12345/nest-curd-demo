import { Injectable } from '@nestjs/common';
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
    return await this.userModel.findById(_id);
  }

  async addOne(body: CreateUserDTO): Promise<void> {
    await this.userModel.create(body);
  }

  async editOne(_id: string, body: EditUserDTO): Promise<void> {
    await this.userModel.findByIdAndUpdate(_id, body);
  }

  async deleteOne(_id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(_id);
  }
}
