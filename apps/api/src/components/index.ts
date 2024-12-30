import { AddressModule } from './address';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { StoreModule } from './store';
import { RoleModule } from './role';
import { BillboardModule } from './billboard';
import { CategoryModule } from './category/category.module';
import { SizeModule } from './size';

export const moduleComponents = [
  AddressModule,
  AuthModule,
  UserModule,
  StoreModule,
  RoleModule,
  BillboardModule,
  CategoryModule,
  SizeModule,
];
