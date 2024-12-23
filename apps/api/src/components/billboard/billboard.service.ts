import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  IBillboard,
  Pagination,
  TCreateBillboardInput,
  TFilterBillboardsInput,
} from '@packages/models';
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';
import { IService } from '../../core';
import { Billboard } from './schema/billboard.model';
import { StoreService } from '../store/store.service';

@Injectable()
export class BillboardService
  implements IService<IBillboard, TFilterBillboardsInput>
{
  constructor(
    @InjectModel(Billboard.name)
    private Billboard: Model<IBillboard>,
    private storeService: StoreService,
  ) {}
  async findOne(
    filter?: FilterQuery<IBillboard>,
    projection?: ProjectionType<IBillboard> | null,
    options?: QueryOptions<IBillboard> | null,
  ): Promise<IBillboard | null> {
    return this.Billboard.findOne(
      { ...filter, active: true },
      projection,
      options,
    );
  }
  async find(
    filter: FilterQuery<IBillboard>,
    projection?: ProjectionType<IBillboard> | null,
    options?: QueryOptions<IBillboard> | null,
  ): Promise<IBillboard[]> {
    return this.Billboard.find(
      { ...filter, active: true },
      projection,
      options,
    );
  }
  async paginate(
    data: TFilterBillboardsInput,
    page?: number,
    perPage?: number,
  ): Promise<Pagination<IBillboard>> {
    throw new Error('Method not implemented.');
  }

  async updateOne(
    filter: FilterQuery<IBillboard>,
    data: Partial<IBillboard>,
    options?: QueryOptions<IBillboard> | null,
  ): Promise<IBillboard | null> {
    return this.Billboard.findOneAndUpdate(filter, data, options);
  }

  async createBillboard(data: TCreateBillboardInput): Promise<IBillboard> {
    const store = await this.storeService.findOne({ _id: data?.store });
    if (!store) {
      throw new Error('Store not found');
    }

    const billboardIds = store.billboards?.map((b) => b._id!) || [];

    const billboard = await this.Billboard.create(data);

    await this.storeService.updateOne(
      {
        _id: store._id,
      },
      {
        billboards: [...billboardIds, billboard._id!],
      },
    );

    return billboard;
  }

  async deleteOne(filter: FilterQuery<IBillboard>): Promise<IBillboard | null> {
    return this.Billboard.findOneAndUpdate(filter, { active: false });
  }
}
