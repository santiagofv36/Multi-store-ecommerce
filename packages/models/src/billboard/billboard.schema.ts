import type { z } from 'zod';
import { billboardDefinition } from './billboard.dto';
import { Document, type Types, Schema } from 'mongoose';

export type IBillboard = z.infer<typeof billboardDefinition>;

export type BillboardDocument = IBillboard &
  Document<Types.ObjectId, object, IBillboard>;

export const billboardSchema = new Schema<IBillboard>(
  {
    label: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
