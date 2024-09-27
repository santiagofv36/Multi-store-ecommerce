import { MongooseModule } from '@nestjs/mongoose';
import { MongooseModels } from './models';

export const createMongooseFeature = (models: MongooseModels) =>
  MongooseModule.forFeature(models);
