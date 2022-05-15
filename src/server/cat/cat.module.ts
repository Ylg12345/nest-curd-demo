import { Module } from '@nestjs/common';
import { CatsController } from './cat.controller';
import { CatsService } from './cat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { catSchema } from './cat.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cats', schema: catSchema }])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatModule {}
