import { Base } from '../../core';
import { Controller } from '../../core';
import {
  createCategoryInput,
  filterCategoryInput,
  findOneCategoryInput,
  TCreateCategoryInput,
  TFilterCategoryInput,
} from '@packages/models';
import { Types } from 'mongoose';
import { CategoryService } from './category.service';
import { Body, Query } from '@nestjs/common';
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
}
