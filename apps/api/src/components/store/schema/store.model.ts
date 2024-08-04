import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { createStoreInput } from '@packages/models';
import { zodToClass } from '../../../lib/zod-to-schema';

@Schema({
  timestamps: true,
})
export class Store extends zodToClass(createStoreInput) {}

export const StoreSchema = SchemaFactory.createForClass(Store);
