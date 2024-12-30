import { Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { Base } from '../../core/decorators/global.decorator';
import { createRoleInput, TCreateRoleInput } from '@packages/models';
import { Controller } from 'src/core';

@Controller({
  route: 'role',
  document: 'role',
})
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Base('POST', {
    route: '',
    zodSchema: createRoleInput,
  })
  async create(@Body() data: TCreateRoleInput) {
    return await this.roleService.createRole(data);
  }
}
