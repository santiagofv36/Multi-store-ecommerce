import { basicDefinition } from '../basicDefinitions';
import { z } from 'zod';

export const storeDefinition = basicDefinition.extend({
  name: z
    .string()
    .min(1, { message: 'Name must be at least 1 character long' }),
});

// create store

export const createStore = storeDefinition.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

export type TCreateStore = z.infer<typeof createStore>;

// pagination

export const filterStore = storeDefinition.partial().optional();

export type TFilterStore = z.infer<typeof filterStore>;
