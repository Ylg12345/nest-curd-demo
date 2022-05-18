import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuardUser } from '../auth/guards/jwt-auth.guard';
import { LocalAuthGuardUser } from '../auth/guards/local-auth.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { EditUserDTO } from './dto/update-user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';

@Controller('api/user')
@ApiTags('用户')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '获取全部用户' })
  @UseGuards(JwtAuthGuardUser)
  @ApiBearerAuth()
  @Get('users')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: '根据_id查找用户' })
  @Get(':_id')
  async findOne(@Param('_id') _id: string): Promise<User> {
    return await this.userService.findOne(_id);
  }

  @ApiOperation({ summary: '用户注册' })
  @UseGuards(JwtAuthGuardUser)
  @ApiBearerAuth()
  @Post('rigster')
  @UsePipes(new ValidationPipe())
  async addOne(@Body() body: CreateUserDTO): Promise<void> {
    return await this.userService.addOne(body);
  }

  @ApiOperation({ summary: '修改用户' })
  @Put(':_id')
  async editOne(
    @Param('_id') _id: string,
    @Body() body: EditUserDTO,
  ): Promise<void> {
    return await this.userService.editOne(_id, body);
  }

  @ApiOperation({ summary: '删除用户' })
  @Delete(':_id')
  async deleteOne(@Param('_id') _id: string): Promise<void> {
    return await this.userService.deleteOne(_id);
  }
}
