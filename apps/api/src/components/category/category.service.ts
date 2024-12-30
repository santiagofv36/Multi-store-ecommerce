import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ICategory,
  Pagination,
  TCreateCategoryInput,
  TFilterCategoryInput,
} from '@packages/models';
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';
import { IService } from '../../core';
import { Category } from './schema/category.model';
import { StoreService } from '../store/store.service';
import { BillboardService } from '../billboard/billboard.service';

@Injectable()
export class CategoryService
  implements IService<ICategory, TFilterCategoryInput>
{
  constructor(
    @InjectModel(Category.name)
    private Category: Model<ICategory>,
    private storeService: StoreService,
    private billboardService: BillboardService,
  ) {}

  async findOne(
    filter?: FilterQuery<ICategory>,
    projection?: ProjectionType<ICategory> | null,
    options?: QueryOptions<ICategory> | null,
  ): Promise<ICategory | null> {
    const data = await this.Category.findOne(
      {
        ...filter,
        active: true,
      },
      projection,
      options,
    ).populate('billboard');
    if (!data) {
      throw new Error('Category not found');
    }
    return data;
  }

  async find(
    filter: FilterQuery<ICategory>,
    projection?: ProjectionType<ICategory> | null,
    options?: QueryOptions<ICategory> | null,
  ): Promise<ICategory[]> {
    return this.Category.find(
      { ...filter, active: true },
      projection,
      options,
    ).populate('billboard');
  }

  async paginate(
    data: TFilterCategoryInput,
    page?: number,
    perPage?: number,
  ): Promise<Pagination<ICategory>> {
    throw new Error('Method not implemented.');
  }

  async updateOne(
    filter: FilterQuery<ICategory>,
    data: Partial<ICategory>,
    options?: QueryOptions<ICategory> | null,
  ): Promise<ICategory | null> {
    return this.Category.findOneAndUpdate(filter, data, options);
  }

  async createCategory(
    data: TCreateCategoryInput,
  ): Promise<ICategory | undefined> {
    const store = await this.storeService.findOne({ _id: data.store });
    if (!store) {
      throw new Error('Store not found');
    }

    const billboard = await this.billboardService.findOne({
      _id: data.billboard,
    });
    if (!billboard) {
      throw new Error('Billboard not found');
    }

    const categoryIds = store.categories?.map((c) => c._id!) || [];

    const category = await this.Category.create(data);

    await this.storeService.updateOne(
      {
        _id: store._id,
      },
      {
        categories: [...categoryIds, category._id!],
      },
    );

    return category;
  }

  async findCategoriesByStore(storeId: string) {
    return this.Category.find({ store: storeId });
  }

  async findCategoriesByBillboard(billboardId: string) {
    return this.Category.find({ billboard: billboardId });
  }

  async deleteOne(filter: FilterQuery<ICategory>): Promise<ICategory | null> {
    return this.Category.findOneAndUpdate(filter, {
      active: false,
    });
  }
}