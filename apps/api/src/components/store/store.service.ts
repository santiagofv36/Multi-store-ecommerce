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
  ): Promise<IStore[] | IStore> {
    return this.Store.find(filter, projection, options);
  }

  async findOne(
    filter?: FilterQuery<IStore>,
    projection?: ProjectionType<IStore> | null,
    options?: QueryOptions<IStore> | null,
  ): Promise<IStore | null> {
    return this.Store.findOne(filter, projection, options);
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
}
