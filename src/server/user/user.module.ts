import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './user.schema';
import { UserService } from './user.service';
import { UploadService } from '../upload/upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { uid } from 'uid';
import * as path from 'path';
import { baseHosts } from '../../libs/lib';

const { NODE_ENV } = process.env;

const baseHost = baseHosts[NODE_ENV] || {
  uploadPath: 'public/',
  baseHost: 'http://localhost:3000/',
  domain: 'YLG',
};

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: userSchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: `./${baseHost.uploadPath}uploads/`,
        filename: (_req, file: any, cb) => {
          file = file.upload ? file.upload : file;
          return cb(
            null,
            uid(32) + Date.now() + path.extname(file.originalname),
          );
        },
      }),
    }),
  ],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService, UploadService],
})
export class UserModule {}
