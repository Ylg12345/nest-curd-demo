import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ description: '唯一标识' })
  @IsString()
  @IsNotEmpty({ message: '用户_id不能为空' })
  readonly _id: string;

  @ApiProperty({ description: '用户名' })
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly user_name: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  @IsNotEmpty({ message: '用户密码不能为空' })
  readonly password: string;
}

export class EditUserDTO {
  readonly user_name: string;
  readonly password: string;
}
