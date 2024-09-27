import { z } from 'zod';
import { basicModelDefinition } from '../basicDefinitions';

export const billboardDefinition = basicModelDefinition.extend({
  label: z.string(),
  imageUrl: z.string(),
});

export const createBillboardInput = billboardDefinition.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

export type TCreateBillboardInput = z.infer<typeof createBillboardInput>;

// Pagination
export const filterBillboardInput = billboardDefinition.partial().optional();
export type TFilterBillboardsInput = z.infer<typeof filterBillboardInput>;

// Find one

export const findOneBillboardInput = billboardDefinition.pick({
  _id: true,
});

export type TFindOneBillboardInput = z.infer<typeof findOneBillboardInput>;

export const updateBillboardInput = billboardDefinition.pick({
  label: true,
  imageUrl: true,
  _id: true,
});

export type TUpdateBillboardInput = z.infer<typeof updateBillboardInput>;
