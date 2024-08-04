import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './schema/store.model';
import { UserService } from '../user/user.service';
import { User, UserSchema } from '../user/schema/user.model';
import { Role, RoleSchema } from '../role/schema/role.model';
import { RoleService } from '../role/role.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  controllers: [StoreController],
  providers: [StoreService, UserService, RoleService],
})
export class StoreModule {}
