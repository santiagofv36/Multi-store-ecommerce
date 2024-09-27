import { User, UserSchema } from '../components/user/schema/user.model';
import { Role, RoleSchema } from '../components/role/schema/role.model';
import { Store, StoreSchema } from '../components/store/schema/store.model';
import {
  Billboard,
  BillboardSchema,
} from '../components/billboard/schema/billboard.model';
import mongoose from 'mongoose';

export type MongooseModels = {
  name: string;
  schema: mongoose.Schema;
}[];

export const models: MongooseModels = [
  { name: User.name, schema: UserSchema },
  { name: Role.name, schema: RoleSchema },
  { name: Store.name, schema: StoreSchema },
  { name: Billboard.name, schema: BillboardSchema },
];
