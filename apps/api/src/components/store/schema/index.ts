import { models, MongooseModels } from '../../../core/models';

export const StoreSchemas: MongooseModels = models.filter(
  (model) =>
    model.name === 'Store' || model.name === 'User' || model.name === 'Role',
);
