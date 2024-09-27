import { Module } from '@nestjs/common';
import { BillboardService } from './billboard.service';
import { BillboardController } from './billboard.controller';
import { StoreService } from '../store/store.service';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import { createMongooseFeature } from 'src/core/mongoose-utils';
import { BillboardSchemas } from './schema';

@Module({
  imports: [createMongooseFeature(BillboardSchemas)],
  controllers: [BillboardController],
  providers: [BillboardService, StoreService, UserService, RoleService],
})
export class BillboardModule {}
