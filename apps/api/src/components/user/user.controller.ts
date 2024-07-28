import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { ZodValidationPipe } from '../../core/pipes';
import { createUserInput, TCreateUserInput } from '@packages/models';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  @UsePipes(new ZodValidationPipe(createUserInput))
  create(@Body() data: TCreateUserInput) {
    return this.userService.createUser(data);
  }

  @Get('')
  async find() {
    return this.userService.find({});
  }
}
