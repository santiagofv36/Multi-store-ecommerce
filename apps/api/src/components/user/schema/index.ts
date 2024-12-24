import { models, MongooseModels } from '../../../core/models';

export const UserSchemas: MongooseModels = models.filter(
  (model) => model.name === 'User' || model.name === 'Role',
);
