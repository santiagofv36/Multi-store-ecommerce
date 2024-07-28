import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { createUserInput, userDefinition } from '@packages/models';
import { hash } from 'argon2';
import { Document, Types } from 'mongoose';
import { Address, AddressSchema } from '../../address/schema/address.model';
import { zodToClass } from '../../../lib/zod-to-schema';
import { Type, Exclude } from 'class-transformer';

@Schema({
  timestamps: true,
})
export class User extends zodToClass(createUserInput) {
  @Exclude()
  password: string;
  @Prop({ type: Types.ObjectId, ref: Address.name })
  @Type(() => Address)
  address: Address;
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
