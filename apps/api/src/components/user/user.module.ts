import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { createMongooseFeature } from 'src/core/mongoose-utils';
import { UserSchemas } from './schema';

@Module({
  imports: [createMongooseFeature(UserSchemas)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
