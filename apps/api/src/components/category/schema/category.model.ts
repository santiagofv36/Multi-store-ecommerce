import { zodToClass } from '../../../lib/zod-to-schema';
import { Type } from 'class-transformer';
import { Store } from '../../store/schema/store.model';
import { Billboard } from '../../billboard/schema/billboard.model';
import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { createCategoryInput } from '@packages/models';

@Schema({
  timestamps: true,
})
export class Category extends zodToClass(createCategoryInput) {
  @Type(() => Store)
  @Prop({ type: Types.ObjectId, ref: Store.name })
  store: Types.ObjectId;
  @Type(() => Billboard)
  @Prop({ type: Types.ObjectId, ref: Billboard.name })
  billboard: Types.ObjectId;
  @Prop()
  active: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
