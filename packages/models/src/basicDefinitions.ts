import { z } from 'zod';
import { Types } from 'mongoose';

export const basicDefinition = z.object({
  _id: z.instanceof(Types.ObjectId).optional(),
  createdAt: z.string().datetime().or(z.date()).nullable().optional(),
  updatedAt: z.string().datetime().or(z.date()).nullable().optional(),
});

export const basicModelDefinition = basicDefinition.extend({
  active: z.boolean().default(true),
});

export const paginateParams = z.object({
  page: z.number(),
  perPage: z.number(),
});

export type TPaginateInput = z.infer<typeof paginateParams>;

export type Pagination<Model> = {
  count: number;
  items: Model[];
  pageInfo: {
    currentPage: number;
    perPage: number;
    page: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
};

export const objectIdString = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
}).transform((val) => new Types.ObjectId(val));