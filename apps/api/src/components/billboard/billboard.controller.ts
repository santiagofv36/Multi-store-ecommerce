import { Base } from '../../core/decorators/global.decorator';
import { CustomController } from 'src/core';
import { Body, Param, Query } from '@nestjs/common';
import { BillboardService } from './billboard.service';
import {
  createBillboardInput,
  filterBillboardInput,
  findOneBillboardInput,
  TCreateBillboardInput,
  TFilterBillboardsInput,
} from '@packages/models';
import { parseObjectId } from 'src/lib/parse-object-id';
import { Types } from 'mongoose';

@CustomController({
  route: 'billboard',
  document: 'billboard',
})
export class BillboardController {
  constructor(private readonly billboardService: BillboardService) {}

  @Base('POST', {
    route: '',
    zodSchema: createBillboardInput,
    operation: 'create',
  })
  async create(@Body() data: TCreateBillboardInput) {
    return this.billboardService.createBillboard(data);
  }

  @Base('GET', {
    route: '',
    operation: 'read',
  })
  async find(@Query() data: TFilterBillboardsInput) {
    return this.billboardService.find({
      ...data,
      store: new Types.ObjectId(data?.store),
    });
  }

  @Base('GET', {
    route: ':_id',
    operation: 'read',
    zodSchema: findOneBillboardInput,
  })
  async findOne(@Param() _id: string) {
    return this.billboardService.findOne({ _id });
  }

  @Base('PATCH', {
    operation: 'update',
    zodSchema: filterBillboardInput,
  })
  async updateOne(@Body() data: TFilterBillboardsInput) {
    return this.billboardService.updateOne(
      {
        _id: data!._id,
      },
      data!,
      { new: true },
    );
  }

  @Base('DELETE', {
    operation: 'delete',
    route: ':_id',
    zodSchema: findOneBillboardInput,
  })
  async deleteOne(@Param() _id: string) {
    return this.billboardService.deleteOne({ _id });
  }
}
