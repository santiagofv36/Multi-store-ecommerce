import { Body, Controller, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TLoginInput, loginInput } from '@packages/models';
import { Base, CustomController } from '../../core';

@CustomController({
  route: 'auth',
  document: 'user',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Base('POST', {
    anonymous: true,
    zodSchema: loginInput,
  })
  login(@Body() body: TLoginInput) {
    return this.authService.login(body);
  }

  @Base('GET', {
    route: 'me',
    operation: 'read',
  })
  async currentUser(@Req() req: any): Promise<any> {
    return req.user;
  }

  @Base('DELETE', {
    operation: 'delete',
  })
  async logout(@Req() req: any): Promise<any> {
    return this.authService.logout(req.user);
  }
}
