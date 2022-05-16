import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO, EditUserDTO } from './user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';
import { TransformInterceptor } from '../../core/interceptor/transform.interceptor';
import { HttpExceptionFilter } from '../../core/filter/http-exception.filter';

@Controller('user')
@ApiTags('用户')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new TransformInterceptor())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '获取全部用户' })
  @Get('users')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':_id')
  async findOne(@Param('_id') _id: string): Promise<User> {
    return await this.userService.findOne(_id);
  }

  @Post()
  async addOne(@Body() body: CreateUserDTO): Promise<void> {
    return await this.userService.addOne(body);
  }

  @Put(':_id')
  async editOne(
    @Param('_id') _id: string,
    @Body() body: EditUserDTO,
  ): Promise<void> {
    return await this.userService.editOne(_id, body);
  }

  @Delete(':_id')
  async deleteOne(@Param('_id') _id: string): Promise<void> {
    return await this.userService.deleteOne(_id);
  }
}
