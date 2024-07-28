import { z } from 'zod';
import { sessionDefinition } from './session.dto';
import { Types, Document, Schema } from 'mongoose';

export type ISession = z.infer<typeof sessionDefinition>;

export type SessionDocument = ISession &
  Document<Types.ObjectId, object, ISession>;

export const sessionSchema = new Schema<ISession>(
  {
    token: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);
