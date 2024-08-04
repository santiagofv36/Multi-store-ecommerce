import {
  Body,
  Controller,
  UsePipes,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { ZodValidationPipe } from 'src/core/pipes';
import { createStoreInput, TCreateStoreInput } from '@packages/models';
import { AuthGuard } from '@nestjs/passport';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post('')
  @UsePipes(new ZodValidationPipe(createStoreInput))
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() data: TCreateStoreInput) {
    return await this.storeService.createStore(data);
  }

  @Get('')
  async find() {
    return await this.storeService.find({});
  }
}
