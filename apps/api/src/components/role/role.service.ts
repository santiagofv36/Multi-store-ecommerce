import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './schema/role.model';
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';
import {
  IRole,
  Pagination,
  TCreateRoleInput,
  TFilterRoleInput,
} from '@packages/models';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private Role: Model<IRole>,
  ) {}

  async find(
    filter: FilterQuery<IRole>,
    projection?: ProjectionType<IRole> | null,
    options?: QueryOptions<IRole> | null,
  ): Promise<IRole[] | IRole> {
    return this.Role.find(filter, projection, options);
  }

  async findOne(
    filter?: FilterQuery<IRole>,
    projection?: ProjectionType<IRole> | null,
    options?: QueryOptions<IRole> | null,
  ): Promise<IRole | null> {
    return this.Role.findOne(filter, projection, options);
  }

  async paginate(
    data: TFilterRoleInput,
    page?: number,
    perPage?: number,
  ): Promise<Pagination<IRole>> {
    throw new Error('not implemented');
  }

  async updateOne(
    filter: FilterQuery<IRole>,
    data: Partial<IRole>,
    options?: QueryOptions<IRole> | null,
  ): Promise<IRole | null> {
    return this.Role.findByIdAndUpdate(filter, data, options);
  }

  async createRole(data: TCreateRoleInput) {
    return this.Role.create(data);
  }
}
