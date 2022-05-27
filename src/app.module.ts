import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './server/user/user.module';
import { AuthModule } from './server/auth/auth.module';
import { UploadModule } from './server/upload/upload.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/curd-demo'),
    UserModule,
    AuthModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
