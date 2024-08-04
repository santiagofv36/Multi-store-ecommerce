import { SetMetadata } from '@nestjs/common';
import { TRoleEnum } from '@packages/models';

export const Roles = (...roles: TRoleEnum[]) => SetMetadata('roles', roles);
