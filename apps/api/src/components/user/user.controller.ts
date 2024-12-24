import { Body } from '@nestjs/common';
import { UserService } from './user.service';
import {
  createUserInput,
  filterUserInput,
  TCreateUserInput,
  TFilterUsersInput,
} from '@packages/models';
import { Base } from '../../core/decorators/global.decorator';
import { CustomController } from 'src/core';

@CustomController({
  route: 'user',
  document: 'user',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Base('POST', {
    zodSchema: createUserInput,
    anonymous: true,
  })
  create(@Body() data: TCreateUserInput) {
    return this.userService.createUser(data);
  }

  @Base('GET', {
    anonymous: true,
  })
  async find() {
    return this.userService.find({});
  }

  @Base('PUT', {
    route: '',
    zodSchema: filterUserInput,
    anonymous: true,
  })
  async update(@Body() data: TFilterUsersInput) {
    return this.userService.updateOne(
      {
        _id: data?._id,
      },
      data!,
      { new: true },
    );
  }
}
