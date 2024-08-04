import { SetMetadata } from '@nestjs/common';
import { TPermissionsEnum } from '@packages/models';

export const Operation = (operation: TPermissionsEnum) =>
  SetMetadata('operation', operation);
