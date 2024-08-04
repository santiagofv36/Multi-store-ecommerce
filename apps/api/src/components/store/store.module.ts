import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './schema/store.model';
import { UserService } from '../user/user.service';
import { User, UserSchema } from '../user/schema/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [StoreController],
  providers: [StoreService, UserService],
})
export class StoreModule {}
