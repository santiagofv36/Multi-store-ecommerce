import { z } from 'zod';
import { basicModelDefinition } from '../basicDefinitions';

export const addressDefinition = basicModelDefinition.extend({
  city: z.string(),
  street: z.string(),
});

// create address

export const createAddressInput = addressDefinition.omit({
  _id: true,
  updatedAt: true,
  createdAt: true,
});

export type TCreateAddressInput = z.infer<typeof createAddressInput>;

export const filterAddressInput = addressDefinition.partial().optional();
export type TFilterAddressInput = z.infer<typeof filterAddressInput>;
