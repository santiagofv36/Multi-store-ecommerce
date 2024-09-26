import { basicModelDefinition } from '../basicDefinitions';
import { z } from 'zod';

export const permissions = [
  'create',
  'read',
  'update',
  'delete',
  'all',
] as const;

export type TPermissionsEnum = (typeof permissions)[number];

export const roleDefinition = basicModelDefinition.extend({
  name: z.string(),
  description: z.string(),
  documents: z.array(
    z.object({
      name: z.string(),
      permissions: z.array(z.enum(permissions)),
    })
  ),
});

export const createRoleInput = roleDefinition.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

export type TCreateRoleInput = z.infer<typeof createRoleInput>;

export const filterRoleInput = roleDefinition.partial().optional();

export type TFilterRoleInput = z.infer<typeof filterRoleInput>;
