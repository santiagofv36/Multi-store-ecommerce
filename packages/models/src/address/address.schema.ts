import { z } from 'zod';
import { addressDefinition } from './address.dto';
import { Document, Schema, Types } from 'mongoose';

export type IAddress = z.infer<typeof addressDefinition>;

export type AddressDocument = Document<Types.ObjectId, object, IAddress>;

export const addressSchema = new Schema<IAddress>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
  },
  { timestamps: true }
);
