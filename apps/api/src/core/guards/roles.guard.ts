import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TPermissionsEnum, TRoleEnum } from '@packages/models';
import { UserService } from 'src/components/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<TRoleEnum[]>(
      'roles',
      context.getHandler(),
    );

    const operation = this.reflector.get<TPermissionsEnum>(
      'operation',
      context.getHandler(),
    );

    console.log(roles, operation);

    return false;
  }
}
