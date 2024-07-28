import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  IAddress,
  Pagination,
  TCreateAddressInput,
  TFilterAddressInput,
} from '@packages/models';
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';
import { Address } from './schema/address.model';
import { IService } from '../../core/service.interface';

@Injectable()
export class AddressService implements IService<IAddress, TFilterAddressInput> {
  constructor(
    @InjectModel(Address.name)
    private Address: Model<IAddress>,
  ) {}

  async find(
    filter: FilterQuery<IAddress>,
    projection?: ProjectionType<IAddress> | null,
    options?: QueryOptions<IAddress> | null,
  ): Promise<IAddress[] | IAddress> {
    return this.Address.find(filter, projection, options);
  }

  async findOne(
    filter?: FilterQuery<IAddress>,
    projection?: ProjectionType<IAddress> | null,
    options?: QueryOptions<IAddress> | null,
  ): Promise<IAddress | null> {
    return this.Address.findOne(filter, projection, options);
  }

  async paginate(
    data: TFilterAddressInput,
    page?: number,
    perPage?: number,
  ): Promise<Pagination<IAddress>> {
    throw new Error('not implemented');
  }

  async createAddress(data: TCreateAddressInput) {
    return this.Address.create(data);
  }
}
