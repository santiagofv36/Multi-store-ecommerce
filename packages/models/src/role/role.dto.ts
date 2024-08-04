import { basicDefinition } from '../basicDefinitions';
import { z } from 'zod';

export const permissions = [
  'create',
  'read',
  'update',
  'delete',
  'all',
] as const;

export type TPermissionsEnum = (typeof permissions)[number];

export const roleDefinition = basicDefinition.extend({
  name: z.string(),
  description: z.string(),
  document: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      permissions: z.enum(permissions),
    })
  ),
});
