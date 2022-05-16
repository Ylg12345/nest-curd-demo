import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ description: '唯一标识' })
  readonly _id: string;

  @IsNotEmpty({ message: '用户名必填' })
  @ApiProperty({ description: '用户名' })
  readonly user_name: string;

  @ApiProperty({ description: '密码' })
  readonly password: string;
}

export class EditUserDTO {
  readonly user_name: string;
  readonly password: string;
}
