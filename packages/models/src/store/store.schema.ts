import type { z } from 'zod';
import { storeDefinition } from './store.dto';
import { Document, type Types, Schema } from 'mongoose';

export type IStore = z.infer<typeof storeDefinition>;

export type StoreDocument = IStore & Document<Types.ObjectId, object, IStore>;

export const storeSchema = new Schema<IStore>(
  {
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    billboards: [{ type: Schema.Types.ObjectId, ref: 'Billboard' }],
    active: {
      type: Boolean,
      default: true,
    },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  },
  { timestamps: true },
);
