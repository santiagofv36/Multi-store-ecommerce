import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TPermissionsEnum } from '@packages/models';
import { RoleService } from '../../components/role/role.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const operation = this.reflector.get<TPermissionsEnum>(
      'operation',
      context.getHandler(),
    );

    const document = this.reflector.get<string>('document', context.getClass());

    if (!operation || !document) {
      return false;
    }

    const request = context.switchToHttp().getRequest();

    if (request?.user) {
      const user = request.user;
      const role = await this.roleService.findOne({ _id: user.role });

      const documents = role?.documents;

      if (!documents) {
        return false;
      }

      // We iterate over the documents of the role to check if the operation is allowed
      const documentPermissions = documents.find((_document) =>
        // We iterate over the permissions of the document to check if the operation is allowed
        _document.permissions.find(
          (permission) =>
            // We check if the operation is allowed for the document if it is 'all' or the operation is the same
            (permission === 'all' && _document.name === document) ||
            (permission === operation && _document.name === document),
        ),
      );

      if (documentPermissions) {
        return true;
      }
    }

    return false;
  }
}
