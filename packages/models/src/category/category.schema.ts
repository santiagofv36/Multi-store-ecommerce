import type { z } from 'zod';
import { categoryDefinition } from './category.dto';
import { Document, type Types, Schema } from 'mongoose';

export type ICategory = z.infer<typeof categoryDefinition>;

export type CategoryDocument = ICategory &
  Document<Types.ObjectId, object, ICategory>;

export const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    billboard: {
      type: Schema.Types.ObjectId,
      ref: 'Billboard',
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
);
