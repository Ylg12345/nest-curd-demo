import { ApiProperty } from '@nestjs/swagger';

export class EditUserDTO {
  @ApiProperty({ description: '用户名' })
  readonly user_name: string;

  @ApiProperty({ description: '密码' })
  readonly password: string;
}
