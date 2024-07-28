import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { createAddressInput } from '@packages/models';
import { zodToClass } from '../../../lib/zod-to-schema';

@Schema({
  timestamps: true,
})
export class Address extends zodToClass(createAddressInput) {}

export const AddressSchema = SchemaFactory.createForClass(Address);
