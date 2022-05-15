import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './server/user/user.module';
import { CatModule } from './server/cat/cat.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/curd-demo'),
    UserModule,
    CatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
