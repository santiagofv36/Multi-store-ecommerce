import type { z } from 'zod';
import { userDefinition } from './user.dto';
import { Document, type Types, Schema } from 'mongoose';
import { sessionSchema } from '../session';

export type IUser = z.infer<typeof userDefinition>;

export type UserDocument = IUser & Document<Types.ObjectId, object, IUser>;

export const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    activeSessions: sessionSchema,
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    }
  },
  { timestamps: true }
);
