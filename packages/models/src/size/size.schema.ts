import type { z } from 'zod';
import { sizeDefinition } from './size.dto';
import { Document, type Types, Schema } from 'mongoose';

export type ISize = z.infer<typeof sizeDefinition>;

export type SizeDocument = ISize & Document<Types.ObjectId, object, ISize>;

export const sizeSchema = new Schema<ISize>(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
  },
  { timestamps: true },
);
