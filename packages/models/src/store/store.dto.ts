import { userDefinition } from '../user';
import { basicDefinition, objectIdString } from '../basicDefinitions';
import { z } from 'zod';

export const storeDefinition = basicDefinition.extend({
  name: z
    .string()
    .min(1, { message: 'Name must be at least 1 character long' }),
  user: z.union([objectIdString, userDefinition]).optional(),
});

// create store

export const createStoreInput = storeDefinition.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

export type TCreateStoreInput = z.infer<typeof createStoreInput>;

// pagination

export const filterStoreInput = storeDefinition.partial().optional();

export type TFilterStoreInput = z.infer<typeof filterStoreInput>;

export const findOneStoreInput = storeDefinition.pick({
  _id: true,
});

export type TFindOneStoreInput = z.infer<typeof findOneStoreInput>;
