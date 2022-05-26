import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdataUserPasswordDto } from './dto/update-user-password';
import { User } from './user.interface';
import { compareSync } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}

  async findByUsername(username: string) {
    return await this.userModel.findOne({ username }).select('+password');
  }

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
    body.createdAt = new Date();
    body.updatedAt = new Date();
    const { username } = body;
    const existUser = await this.findByUsername(username);
    if (existUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }
    await this.userModel.create(body);
  }

  async updatePassword(_id: string, body: UpdataUserPasswordDto): Promise<any> {
    const user = await this.userModel.findById(_id).select('+password');
    const { oldPassword, password, rePassword } = body;
    if (password !== rePassword) {
      throw new HttpException('密码输入不一致', HttpStatus.BAD_REQUEST);
    }

    if (!compareSync(oldPassword, user.password)) {
      throw new BadRequestException('密码错误');
    }
    body.updatedAt = new Date();
    delete body.oldPassword;
    delete body.rePassword;
    return await this.userModel.findByIdAndUpdate(_id, body);
  }

  async deleteOne(_id: string): Promise<void> {
    const existUser = await this.userModel.findById(_id);
    if (!existUser) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    await this.userModel.findByIdAndDelete(_id);
  }
}
