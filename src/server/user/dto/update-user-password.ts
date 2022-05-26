import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdataUserPasswordDto {
  @ApiProperty({ description: '旧密码' })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({ description: '新密码' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: '确认密码' })
  @IsNotEmpty()
  rePassword: string;

  updatedAt: Date;
}
