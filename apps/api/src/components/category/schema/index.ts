import { models, MongooseModels } from '../../../core/models';

export const CategorySchemas: MongooseModels = models.filter(
  (model) =>
    model.name === 'Category' ||
    model.name === 'User' ||
    model.name === 'Role' ||
    model.name === 'Store' ||
    model.name === 'Billboard',
);
