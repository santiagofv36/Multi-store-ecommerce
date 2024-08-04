import { z } from 'zod';

import { permissions, roleDefinition } from './role.dto';
import { Types, Document, Schema } from 'mongoose';

export type IRole = z.infer<typeof roleDefinition>;

export type RoleDocument = IRole & Document<Types.ObjectId, object, IRole>;

export const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    document: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        permissions: {
          type: String,
          required: true,
          enum: permissions,
        },
      },
    ],
  },
  { timestamps: true }
);
