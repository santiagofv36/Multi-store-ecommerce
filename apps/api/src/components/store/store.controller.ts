import { Body, HttpException, Param, Query, Req } from '@nestjs/common';
import { StoreService } from './store.service';
import {
  createStoreInput,
  filterStoreInput,
  findOneStoreInput,
  TCreateStoreInput,
  TFilterStoreInput,
} from '@packages/models';
import { Base } from '../../core/decorators/global.decorator';
import { CustomController } from '../../core';
import { parseObjectId } from 'src/lib/parse-object-id';

@CustomController({
  route: 'store',
  document: 'store',
})
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Base('POST', {
    route: '',
    zodSchema: createStoreInput,
    operation: 'create',
  })
  async create(@Body() data: TCreateStoreInput, @Req() req: any) {
    const user = req.user;
    return await this.storeService.createStore({
      ...data,
      user: user._id,
    });
  }

  @Base('GET', {
    route: '',
    operation: 'read',
    anonymous: true,
    zodSchema: filterStoreInput,
  })
  async find(@Query() data: TFilterStoreInput) {
    const resp = await this.storeService.find(parseObjectId(data!));

    if (resp.length === 0) {
      throw new HttpException('No stores found', 404);
    }

    return resp;
  }

  @Base('GET', {
    route: ':_id',
    operation: 'read',
    zodSchema: findOneStoreInput,
  })
  async findOne(@Param() _id: string) {
    return await this.storeService.findOne({ _id });
  }

  @Base('PUT', {
    operation: 'update',
    zodSchema: filterStoreInput,
  })
  async updateOne(@Body() data: TFilterStoreInput) {
    return await this.storeService.updateOne(
      {
        _id: data!._id,
      },
      data!,
      { new: true },
    );
  }
}
