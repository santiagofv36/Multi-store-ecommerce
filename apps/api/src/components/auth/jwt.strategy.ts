import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: { _id: string }) {
    const { _id } = payload;

    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    const user = await this.userService.findOne({ _id });

    if (!user) {
      throw new UnauthorizedException('404-user');
    }

    if (!user.activeSession?.token) {
      throw new UnauthorizedException('404-missing-token');
    }

    if (user.activeSession?.token !== token) {
      throw new UnauthorizedException('400-invalid-token');
    }

    return user;
  }
}
