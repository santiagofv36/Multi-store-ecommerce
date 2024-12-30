import {
  createSizeInput,
  filterSizeInput,
  findOneSizeInput,
  TCreateSizeInput,
  TFilterSizesInput,
} from '@packages/models';
import { Base, Controller } from '../../core';
import { SizeService } from './size.service';
import { Body, Param, Query } from '@nestjs/common';
import { Types } from 'mongoose';

@Controller({
  route: 'size',
  document: 'size',
})
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Base('POST', {
    route: '',
    zodSchema: createSizeInput,
    operation: 'create',
  })
  async create(@Body() data: TCreateSizeInput) {
    return this.sizeService.createSize(data);
  }

  @Base('GET', {
    route: '',
    operation: 'read',
  })
  async find(@Query() data: TFilterSizesInput) {
    return this.sizeService.find({
      ...data,
      store: new Types.ObjectId(data?.store),
    });
  }

  @Base('GET', {
    route: ':_id',
    operation: 'read',
    zodSchema: findOneSizeInput,
  })
  async findOne(@Param() _id: string) {
    return this.sizeService.findOne({ _id });
  }

  @Base('PATCH', {
    operation: 'update',
    zodSchema: filterSizeInput,
  })
  async updateOne(@Body() data: TFilterSizesInput) {
    return this.sizeService.updateOne(
      {
        _id: data!._id,
      },
      data!,
      { new: true },
    );
  }

  @Base('DELETE', {
    route: ':_id',
    operation: 'delete',
    zodSchema: findOneSizeInput,
  })
  async deleteOne(@Param() _id: string) {
    return this.sizeService.deleteOne({ _id });
  }
}
