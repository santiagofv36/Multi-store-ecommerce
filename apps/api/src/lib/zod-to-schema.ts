/* eslint-disable @typescript-eslint/ban-types */
import {
  z,
  ZodObject,
  ZodString,
  ZodNumber,
  ZodBoolean,
  ZodDate,
  ZodOptional,
  ZodNullable,
  ZodTypeAny,
  ZodArray,
} from 'zod';
import { Prop } from '@nestjs/mongoose';

function getMongooseType(zodType: ZodTypeAny): any {
  if (zodType instanceof ZodString) {
    return String;
  } else if (zodType instanceof ZodNumber) {
    return Number;
  } else if (zodType instanceof ZodBoolean) {
    return Boolean;
  } else if (zodType instanceof ZodDate) {
    return Date;
  } else if (zodType instanceof ZodArray) {
    return [getMongooseType(zodType._def.type)];
  } else if (zodType instanceof ZodOptional || zodType instanceof ZodNullable) {
    return getMongooseType(zodType._def.innerType);
  }
  return Object;
}

export function zodToClass<T extends ZodObject<any>>(
  zodSchema: T,
): new () => {} {
  class DynamicClass {
    constructor(data?: Partial<z.infer<T>>) {
      if (data) {
        Object.assign(this, data);
      }
    }
  }

  const schemaShape = zodSchema.shape;

  for (const key in schemaShape) {
    const zodType = schemaShape[key];
    const mongooseType = getMongooseType(zodType);

    Prop({ type: mongooseType })(DynamicClass.prototype, key);

    Object.defineProperty(DynamicClass.prototype, key, {
      value: undefined,
      writable: true,
      enumerable: true,
    });
  }

  return DynamicClass;
}
