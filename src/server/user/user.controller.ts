import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuardUser } from '../auth/guards/jwt-auth.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserAvatarDto } from './dto/update-user-avatar.dto';
import { UpdataUserPasswordDto } from './dto/update-user-password.dto';
import { User } from './user.interface';
import { UserService } from './user.service';

@Controller('api/user')
@ApiTags('用户')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '获取全部用户' })
  @Get('users')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: '根据_id查找用户' })
  @UseGuards(JwtAuthGuardUser)
  @ApiBearerAuth()
  @Get(':_id')
  async findOne(@Param('_id') _id: string): Promise<User> {
    return await this.userService.findOne(_id);
  }

  @ApiOperation({ summary: '用户注册' })
  @Post('rigster')
  @UsePipes(new ValidationPipe())
  async addOne(@Body() body: CreateUserDTO): Promise<void> {
    return await this.userService.addOne(body);
  }

  @ApiOperation({ summary: '更新密码' })
  @UseGuards(JwtAuthGuardUser)
  @ApiBearerAuth()
  @Put('password/:_id')
  async updatePassword(
    @Param('_id') _id: string,
    @Body() body: UpdataUserPasswordDto,
  ): Promise<void> {
    return await this.userService.updatePassword(_id, body);
  }

  @ApiOperation({ summary: '更新头像' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateUserAvatarDto,
  })
  @Post('avatar/:_id')
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(
    @Param('_id') _id: string,
    @UploadedFile() upload: any,
  ): Promise<void> {
    return await this.userService.updateAvatar(_id, upload);
  }

  @ApiOperation({ summary: '删除用户' })
  @UseGuards(JwtAuthGuardUser)
  @ApiBearerAuth()
  @Delete(':_id')
  async deleteOne(@Param('_id') _id: string): Promise<void> {
    return await this.userService.deleteOne(_id);
  }
}
