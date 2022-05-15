import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO, EditUserDTO } from './user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';

interface UserResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async findAll(): Promise<UserResponse<User[]>> {
    return {
      code: 200,
      data: await this.userService.findAll(),
      message: 'success',
    };
  }

  @Get(':_id')
  async findOne(@Param('_id') _id: string): Promise<UserResponse<User>> {
    const user = await this.userService.findOne(_id);
    if (!user) {
      throw new HttpException(`user #${_id} not found`, HttpStatus.NOT_FOUND);
    }
    return {
      code: 200,
      data: user,
      message: 'success',
    };
  }

  @Post()
  async addOne(@Body() body: CreateUserDTO): Promise<UserResponse> {
    await this.userService.addOne(body);
    return {
      code: 200,
      message: 'success',
    };
  }

  @Put(':_id')
  async editOne(
    @Param('_id') _id: string,
    @Body() body: EditUserDTO,
  ): Promise<UserResponse> {
    await this.userService.editOne(_id, body);
    return {
      code: 200,
      message: 'success',
    };
  }

  @Delete(':_id')
  async deleteOne(@Param('_id') _id: string): Promise<UserResponse> {
    await this.userService.deleteOne(_id);
    return {
      code: 200,
      message: 'success',
    };
  }
}
