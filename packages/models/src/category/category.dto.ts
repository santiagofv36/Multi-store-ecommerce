import { basicModelDefinition, objectIdString } from '../basicDefinitions';
import { billboardDefinition } from '../billboard';
import { z } from 'zod';

export const categoryDefinition = basicModelDefinition.extend({
  store: objectIdString.optional(),
  billboard: z.union([objectIdString, billboardDefinition, z.string()]),
  name: z.string(),
});

export const createCategoryInput = categoryDefinition.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

export type TCreateCategoryInput = z.infer<typeof createCategoryInput>;

// Pagination
export const filterCategoryInput = categoryDefinition.partial().optional();
export type TFilterCategoryInput = z.infer<typeof filterCategoryInput>;

// Find one

export const findOneCategoryInput = categoryDefinition.pick({
  _id: true,
});

export type TFindOneCategoryInput = z.infer<typeof findOneCategoryInput>;

export const updateCategoryInput = categoryDefinition.pick({
  name: true,
  _id: true,
  billboard: true,
});

export type TUpdateCategoryInput = z.infer<typeof updateCategoryInput>;
