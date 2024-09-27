import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { createStoreInput } from '@packages/models';
import { zodToClass } from '../../../lib/zod-to-schema';
import { Types } from 'mongoose';
import { User } from 'src/components/user/schema/user.model';
import { Type } from 'class-transformer';

@Schema({
  timestamps: true,
})
export class Store extends zodToClass(createStoreInput) {
  @Prop({ type: Types.ObjectId, ref: User.name })
  @Type(() => User)
  user: Types.ObjectId;
  @Prop({ type: [Types.ObjectId], ref: 'Billboard' })
  billboards: Types.ObjectId[];
}

export const StoreSchema = SchemaFactory.createForClass(Store);
