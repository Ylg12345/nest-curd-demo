import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserAvatarDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
  updatedAt: Date;
}
