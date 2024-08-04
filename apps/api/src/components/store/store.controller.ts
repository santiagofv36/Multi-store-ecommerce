import { Body, Controller, UsePipes, Post, Get } from '@nestjs/common';
import { StoreService } from './store.service';
import { ZodValidationPipe } from 'src/core/pipes';
import { createStoreInput, TCreateStoreInput } from '@packages/models';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post('')
  @UsePipes(new ZodValidationPipe(createStoreInput))
  async create(@Body() data: TCreateStoreInput) {
    return await this.storeService.createStore(data);
  }

  @Get('')
  async find() {
    return await this.storeService.find({});
  }
}
