import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDTO, EditCatDTO } from './cat.dto';
import { Cat } from './cat.interface';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cats') private readonly catModel: Model<Cat>) {}

  async findAll(): Promise<Cat[]> {
    const cats = await this.catModel.find();
    return cats;
  }

  async findOne(_id: string): Promise<Cat> {
    return await this.catModel.findById(_id);
  }

  async addOne(body: CreateCatDTO): Promise<void> {
    await this.catModel.create(body);
  }

  async editOne(_id: string, body: EditCatDTO): Promise<void> {
    await this.catModel.findByIdAndUpdate(_id, body);
  }

  async deleteOne(_id: string): Promise<void> {
    await this.catModel.findByIdAndDelete(_id);
  }
}
