import { z } from 'zod';
import {
  basicModelDefinition /*objectIdString*/,
  objectIdString,
} from '../basicDefinitions';
import { sessionDefinition } from '../session';
import { roleDefinition } from '../role';
// import { addressDefinition } from '../address';
// import { Types } from 'mongoose';

export const userDefinition = basicModelDefinition.extend({
  email: z.string().email({ message: 'Invalid email' }),
  name: z.string().min(2),
  password: z.string().min(8),
  activeSession: sessionDefinition.optional(),
  // address: z.union([objectIdString, addressDefinition]), // if it is many just use z.array(z.instanceof(Types.ObjectId)) and in the schema use [Schema.Types.ObjectId]
  role: z.union([objectIdString, roleDefinition]),
});

export const createUserInput = userDefinition.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

export type TCreateUserInput = z.infer<typeof createUserInput>;

// Pagination
export const filterUserInput = userDefinition.partial().optional();
export type TFilterUsersInput = z.infer<typeof filterUserInput>;

// Search by email

export const findUserByEmail = userDefinition
  .pick({
    email: true,
  })
  .required();

export type TFindUserByEmail = z.infer<typeof findUserByEmail>;

// login
export const loginInput = userDefinition.pick({
  email: true,
  password: true,
});

export type TLoginInput = z.infer<typeof loginInput>;

export const payloadInput = userDefinition.pick({
  _id: true,
});

export type TPayloadInput = z.infer<typeof payloadInput>;
