import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategyUser } from './strategies/jwt.strategy';
import { LocalStrategyUser } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { jwtConstants } from 'src/libs/lib';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'userjwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '4d' },
    }),
    UserModule,
  ],
  providers: [AuthService, LocalStrategyUser, JwtStrategyUser],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
