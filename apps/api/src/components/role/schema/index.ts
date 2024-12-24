import { models, MongooseModels } from '../../../core/models';

export const RoleSchemas: MongooseModels = models.filter(
  (model) => model.name === 'Role',
);
