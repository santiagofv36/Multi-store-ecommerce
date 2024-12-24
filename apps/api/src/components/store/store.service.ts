import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from './schema/store.model';
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';
import {
  IStore,
  Pagination,
  TCreateStoreInput,
  TFilterStoreInput,
} from '@packages/models';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name)
    private Store: Model<IStore>,
  ) {}

  async find(
    filter: FilterQuery<IStore>,
    projection?: ProjectionType<IStore> | null,
    options?: QueryOptions<IStore> | null,
  ): Promise<IStore[]> {
    return this.Store.find(
      {
        ...filter,
        active: true,
      },
      projection,
      options,
    ).populate([
      {
        path: 'user',
        populate: 'role',
      },
      {
        path: 'billboards',
      },
    ]);
  }

  async findOne(
    filter?: FilterQuery<IStore>,
    projection?: ProjectionType<IStore> | null,
    options?: QueryOptions<IStore> | null,
  ): Promise<IStore | null> {
    return this.Store.findOne(
      {
        ...filter,
        active: true,
      },
      projection,
      options,
    ).populate([
      {
        path: 'user',
        populate: 'role',
      },
      {
        path: 'billboards',
      },
    ]);
  }

  async paginate(
    data: TFilterStoreInput,
    page?: number,
    perPage?: number,
  ): Promise<Pagination<IStore>> {
    throw new Error('not implemented');
  }

  async updateOne(
    filter: FilterQuery<IStore>,
    data: Partial<IStore>,
    options?: QueryOptions<IStore> | null,
  ): Promise<IStore | null> {
    return this.Store.findByIdAndUpdate(filter, data, options);
  }

  async createStore(data: TCreateStoreInput) {
    return this.Store.create(data);
  }

  async deleteOne(filter: FilterQuery<IStore>): Promise<IStore | null> {
    return this.Store.findOneAndUpdate(
      filter,
      {
        active: false,
      },
      { new: true },
    );
  }

  async getBillboards(_id: string) {
    const store = await this.findOne({ _id });
    return store?.billboards;
  }
}
