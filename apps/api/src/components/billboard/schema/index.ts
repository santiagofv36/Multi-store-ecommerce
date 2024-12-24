import { models, MongooseModels } from '../../../core/models';

export const BillboardSchemas: MongooseModels = models.filter(
  (model) =>
    model.name === 'Billboard' ||
    model.name === 'Store' ||
    model.name === 'User' ||
    model.name === 'Role',
);
