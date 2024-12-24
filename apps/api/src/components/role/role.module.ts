import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { createMongooseFeature } from 'src/core/mongoose-utils';
import { RoleSchemas } from './schema';

@Module({
  imports: [createMongooseFeature(RoleSchemas)],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
