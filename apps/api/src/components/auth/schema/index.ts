import { models, MongooseModels } from '../../../core/models';

export const AuthSchemas: MongooseModels = models.filter(
  (model) => model.name === 'User' || model.name === 'Role',
);
