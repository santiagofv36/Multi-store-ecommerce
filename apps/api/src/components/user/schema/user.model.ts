import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { createUserInput, sessionDefinition } from '@packages/models';
import { hash } from 'argon2';
import { Types } from 'mongoose';

import { zodToClass } from '../../../lib/zod-to-schema';
import { Exclude, Type } from 'class-transformer';
import { Role } from '../../role/schema/role.model';

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
  @Prop({ type: Types.ObjectId, ref: Role.name })
  @Type(() => Role)
  role: Types.ObjectId;
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
