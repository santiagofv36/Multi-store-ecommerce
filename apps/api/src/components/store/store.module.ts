import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import { createMongooseFeature } from 'src/core/mongoose-utils';
import { StoreSchemas } from './schema';

@Module({
  imports: [createMongooseFeature(StoreSchemas)],
  controllers: [StoreController],
  providers: [StoreService, UserService, RoleService],
})
export class StoreModule {}
