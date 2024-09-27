import { zodToClass } from '../../../lib/zod-to-schema';
import { Exclude, Type } from 'class-transformer';
import { Store } from '../../store/schema/store.model';
import { createBillboardInput } from '@packages/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Billboard extends zodToClass(createBillboardInput) {
  @Prop({ type: Types.ObjectId, ref: Store.name })
  @Type(() => Store)
  store: Types.ObjectId;
}

export const BillboardSchema = SchemaFactory.createForClass(Billboard);
