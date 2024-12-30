import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { createMongooseFeature } from 'src/core/mongoose-utils';
import { SizeSchemas } from './schema';
import { StoreService } from '../store/store.service';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';

@Module({
  imports: [createMongooseFeature(SizeSchemas)],
  controllers: [SizeController],
  providers: [SizeService, StoreService, UserService, RoleService],
})
export class SizeModule {}
