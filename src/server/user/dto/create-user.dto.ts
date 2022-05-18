import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ description: '用户名' })
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  user_name: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  @IsNotEmpty({ message: '用户密码不能为空' })
  password: string;
}
