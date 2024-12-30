import { Base } from '../../core';
import { Controller } from '../../core';
import {
  filterCategoryInput,
  findOneCategoryInput,
  TCreateCategoryInput,
  TFilterCategoryInput,
} from '@packages/models';
import { CategoryService } from './category.service';
import { BadRequestException, Body, Param, Query } from '@nestjs/common';
import { parseObjectId } from 'src/lib/parse-object-id';

@Controller({
  route: 'category',
  document: 'category',
})
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Base('POST', {
    route: '',
    operation: 'create',
  })
  async create(@Body() data: TCreateCategoryInput) {
    return this.categoryService.createCategory(data);
  }

  @Base('GET', {
    route: '',
    zodSchema: filterCategoryInput,
    operation: 'read',
  })
  async find(@Query() data: TFilterCategoryInput) {
    return this.categoryService.find(parseObjectId(data!));
  }

  @Base('GET', {
    route: ':_id',
    zodSchema: findOneCategoryInput,
    operation: 'read',
  })
  async findOne(@Param() data: { _id: string }) {
    try {
      const category = await this.categoryService.findOne(data);
      return category;
    } catch (error) {
      return new BadRequestException('Category not found');
    }
  }

  @Base('PATCH', {
    operation: 'update',
    zodSchema: filterCategoryInput,
  })
  async update(@Body() data: TFilterCategoryInput) {
    return this.categoryService.updateOne(
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
  })
  async delete(@Param() data: { _id: string }) {
    return this.categoryService.deleteOne(data);
  }
}
