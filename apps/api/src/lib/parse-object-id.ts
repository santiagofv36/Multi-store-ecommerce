import { Types } from 'mongoose';

export function parseObjectId<ZodSchema extends { [key: string]: any }>(
  data: ZodSchema,
) {
  // For each key in the data object that the type is Types.ObjectId, cast it to string and return a new Types.ObjectId
  return Object.keys(data).reduce((acc, key) => {
    if (data[key] instanceof Types.ObjectId) {
      return {
        ...acc,
        [key]: new Types.ObjectId(data[key].toString()),
      };
    }
    return acc;
  }, {});
}
