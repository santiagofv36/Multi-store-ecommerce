import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { createMongooseFeature } from '../../core/mongoose-utils';
import { CategorySchemas } from './schema';
import { StoreService } from '../store/store.service';
import { BillboardService } from '../billboard/billboard.service';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';

@Module({
  imports: [createMongooseFeature(CategorySchemas)],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    StoreService,
    BillboardService,
    UserService,
    RoleService,
  ],
})
export class CategoryModule {}
