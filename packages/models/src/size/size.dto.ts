import { basicModelDefinition, objectIdString } from '../basicDefinitions';
import { z } from 'zod';

export const sizeDefinition = basicModelDefinition.extend({
  store: objectIdString,
  name: z.string(),
  value: z.string(),
});

export const createSizeInput = sizeDefinition.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

export type TCreateSizeInput = z.infer<typeof createSizeInput>;

// Pagination

export const filterSizeInput = sizeDefinition.partial().optional();
export type TFilterSizesInput = z.infer<typeof filterSizeInput>;

// Find one

export const findOneSizeInput = sizeDefinition.pick({
  _id: true,
});

export type TFindOneSizeInput = z.infer<typeof findOneSizeInput>;

export const updateSizeInput = sizeDefinition.pick({
  name: true,
  value: true,
  _id: true,
});

export type TUpdateSizeInput = z.infer<typeof updateSizeInput>;
