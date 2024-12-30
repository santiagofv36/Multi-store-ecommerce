import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ISize,
  Pagination,
  TCreateSizeInput,
  TFilterSizesInput,
} from '@packages/models';
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';
import { IService } from '../../core';
import { Size } from './schema/size.model';
import { StoreService } from '../store/store.service';

@Injectable()
export class SizeService implements IService<ISize, TFilterSizesInput> {
  constructor(
    @InjectModel(Size.name)
    private Size: Model<ISize>,
    private storeService: StoreService,
  ) {}

  async findOne(
    filter?: FilterQuery<ISize>,
    projection?: ProjectionType<ISize> | null,
    options?: QueryOptions<ISize> | null,
  ): Promise<ISize | null> {
    return this.Size.findOne({ ...filter, active: true }, projection, options);
  }

  async find(
    filter: FilterQuery<ISize>,
    projection?: ProjectionType<ISize> | null,
    options?: QueryOptions<ISize> | null,
  ): Promise<ISize[]> {
    return this.Size.find({ ...filter, active: true }, projection, options);
  }

  async paginate(
    data: TFilterSizesInput,
    page?: number,
    perPage?: number,
  ): Promise<Pagination<ISize>> {
    throw new Error('Method not implemented.');
  }

  async updateOne(
    filter: FilterQuery<ISize>,
    data: Partial<ISize>,
    options?: QueryOptions<ISize> | null,
  ): Promise<ISize | null> {
    return this.Size.findOneAndUpdate(filter, data, options);
  }

  async createSize(data: TCreateSizeInput): Promise<ISize> {
    const store = await this.storeService.findOne({ _id: data?.store });
    if (!store) {
      throw new Error('Store not found');
    }

    const sizeIds = store.sizes?.map((size) => size._id!) || [];

    const size = await this.Size.create(data);

    if (!size) {
      throw new Error('Size not created');
    }

    await this.storeService.updateOne(
      {
        _id: store._id,
      },
      {
        sizes: [...sizeIds, size._id],
      },
    );

    return size;
  }

  async deleteOne(filter: FilterQuery<ISize>): Promise<ISize | null> {
    return this.Size.findOneAndUpdate(filter, { active: false });
  }
}
