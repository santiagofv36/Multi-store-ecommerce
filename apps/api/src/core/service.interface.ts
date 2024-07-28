import { Pagination } from '@packages/models';
import { FilterQuery, ProjectionType, QueryOptions } from 'mongoose';

export interface IService<Model, Filter> {
  findOne(
    filter?: FilterQuery<Model>,
    projection?: ProjectionType<Model> | null,
    options?: QueryOptions<Model> | null,
  ): Promise<Model | null>;

  find(
    filter: FilterQuery<Model>,
    projection?: ProjectionType<Model> | null,
    options?: QueryOptions<Model> | null,
  ): Promise<Model[] | Model>;

  paginate(
    data: Filter,
    page?: number,
    perPage?: number,
  ): Promise<Pagination<Model>>;
}
