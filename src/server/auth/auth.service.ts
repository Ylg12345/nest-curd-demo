import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === password) {
      const result = { password, ...user };
      return result;
    }
    return null;
  }

  // 登录
  async login(user: any) {
    const payload = { username: user.user_name, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
