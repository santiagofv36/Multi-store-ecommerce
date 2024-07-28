import { Body, Controller, Post, UsePipes, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/core/pipes/zodValidation.pipe';
import { userDefinition, TCreateUserInput } from '@packages/models';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post()
  // @UsePipes(new ZodValidationPipe(userDefinition))
  // create(@Body() body: TCreateUserInput) {
  //   return this.authService.signUp(body);
  // }

  // @Get()
  // getUsers() {
  //   return this.authService.getUsers();
  // }
}
