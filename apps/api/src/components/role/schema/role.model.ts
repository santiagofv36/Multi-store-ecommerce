import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { createRoleInput } from '@packages/models';
import { zodToClass } from '../../../lib/zod-to-schema';

@Schema({
  timestamps: true,
})
export class Role extends zodToClass(createRoleInput) {}

export const RoleSchema = SchemaFactory.createForClass(Role);
