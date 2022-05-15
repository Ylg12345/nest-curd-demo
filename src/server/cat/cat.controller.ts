import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateCatDTO, EditCatDTO } from './cat.dto';
import { CatsService } from './cat.service';
import { Cat } from './cat.interface';

interface CatResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
}

@Controller('cat')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get('cats')
  async findAll(): Promise<CatResponse<Cat[]>> {
    return {
      code: 200,
      data: await this.catsService.findAll(),
      message: 'success',
    };
  }

  @Get(':_id')
  async findOne(@Param('_id') _id: string): Promise<CatResponse<Cat>> {
    return {
      code: 200,
      data: await this.catsService.findOne(_id),
      message: 'success',
    };
  }

  @Post()
  async addOne(@Body() body: CreateCatDTO): Promise<CatResponse> {
    await this.catsService.addOne(body);
    return {
      code: 200,
      message: 'success',
    };
  }

  @Put(':_id')
  async editOne(
    @Param('_id') _id: string,
    @Body() body: EditCatDTO,
  ): Promise<CatResponse> {
    await this.catsService.editOne(_id, body);
    return {
      code: 200,
      message: 'success',
    };
  }

  @Delete(':_id')
  async deleteOne(@Param('_id') _id: string): Promise<CatResponse> {
    await this.catsService.deleteOne(_id);
    return {
      code: 200,
      message: 'success',
    };
  }
}
