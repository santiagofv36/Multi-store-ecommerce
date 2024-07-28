import { basicModelDefinition } from '../basicDefinitions';
import { z } from 'zod';

export const sessionDefinition = basicModelDefinition.extend({
  token: z.string().max(999),
  expiryDate: z.date(),
});
