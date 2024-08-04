import {
  Body,
  Controller,
  Post,
  UsePipes,
  Get,
  UseGuards,
  Req,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/core/pipes/zodValidation.pipe';
import { TLoginInput, loginInput } from '@packages/models';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(loginInput))
  login(@Body() body: TLoginInput) {
    return this.authService.login(body);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async currentUser(@Req() req: any): Promise<any> {
    return req.user;
  }

  @Delete('')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Req() req: any): Promise<any> {
    return this.authService.logout(req.user);
  }
}
