import { models, MongooseModels } from '../../../core/models';

export const SizeSchemas: MongooseModels = models.filter(
  (model) =>
    model.name === 'Size' ||
    model.name === 'Store' ||
    model.name === 'User' ||
    model.name === 'Role',
);
