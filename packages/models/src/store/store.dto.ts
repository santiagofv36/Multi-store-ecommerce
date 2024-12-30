import { z } from 'zod';
import { userDefinition } from '../user';
import { basicModelDefinition, objectIdString } from '../basicDefinitions';
import { billboardDefinition } from '../billboard';
import { categoryDefinition } from '../category';
import { sizeDefinition } from '../size';

export const storeDefinition = basicModelDefinition.extend({
  name: z
    .string()
    .min(1, { message: 'Name must be at least 1 character long' }),
  user: z.union([objectIdString, userDefinition]).optional(),
  billboards: z
    .union([z.array(objectIdString), z.array(billboardDefinition)])
    .optional(),
  categories: z
    .union([z.array(objectIdString), z.array(categoryDefinition)])
    .optional(),
  sizes: z.union([z.array(objectIdString), z.array(sizeDefinition)]).optional(),
});

// create store

export const createStoreInput = storeDefinition.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

export type TCreateStoreInput = z.infer<typeof createStoreInput>;

// pagination

export const filterStoreInput = storeDefinition
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .partial()
  .optional();

export type TFilterStoreInput = z.infer<typeof filterStoreInput>;

export const findOneStoreInput = storeDefinition.pick({
  _id: true,
});

export type TFindOneStoreInput = z.infer<typeof findOneStoreInput>;

export const updateStoreInput = storeDefinition.pick({
  name: true,
  _id: true,
});

export type TUpdateStoreInput = z.infer<typeof updateStoreInput>;
