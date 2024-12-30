import { zodToClass } from '../../../lib/zod-to-schema';
import { Type } from 'class-transformer';
import { Store } from '../../store/schema/store.model';
import { createSizeInput } from '@packages/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Size extends zodToClass(createSizeInput) {
  @Type(() => Store)
  @Prop({ type: Types.ObjectId, ref: Store.name })
  store: Types.ObjectId;
}

export const SizeSchema = SchemaFactory.createForClass(Size);
