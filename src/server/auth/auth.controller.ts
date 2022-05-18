import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuardUser } from './guards/jwt-auth.guard';
import { LocalAuthGuardUser } from './guards/local-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('user auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '用户登录' })
  //@UseGuards(JwtAuthGuardUser)
  @UseGuards(LocalAuthGuardUser)
  @Post('login')
  async login(@Body() user: LoginUserDto, @Request() req) {
    return this.authService.login(req.user);
  }
}
