import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { createUserInput, sessionDefinition } from '@packages/models';
import { hash } from 'argon2';
import { Types } from 'mongoose';

import { zodToClass } from '../../../lib/zod-to-schema';
import { Exclude } from 'class-transformer';

@Schema({
  timestamps: true,
})
class ActiveSession extends zodToClass(sessionDefinition) {}

@Schema({
  timestamps: true,
})
export class User extends zodToClass(createUserInput) {
  @Exclude()
  password: string;
  @Prop()
  activeSession: ActiveSession;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = (
    await hash(this.password!, { secret: process.env.SECRET })
  ).toString();
  next();
});
