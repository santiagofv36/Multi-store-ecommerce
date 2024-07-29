import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser, TLoginInput, TPayloadInput } from '@packages/models';
import { UserService } from '../user/user.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(data: TLoginInput) {
    const user = await this.userService.findOne({
      email: data.email,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials!');
    }

    const isValid = await verify(user.password, data.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid Credentials!');
    }

    const cleanUserId: TPayloadInput = {
      _id: user._id!,
    };

    const token = this.jwtService.sign(cleanUserId);

    return await this.userService.updateOne(
      {
        _id: user._id,
      },
      {
        activeSession: {
          token,
          expiryDate: new Date(
            Date.now() + Number(process.env.JWT_EXPIRES || 0),
          ),
        },
      },
      { new: true },
    );
  }

  async logout(user: IUser): Promise<IUser | null> {
    return await this.userService.updateOne(
      {
        _id: user._id,
      },
      {
        activeSession: {
          token: '',
          expiryDate: new Date(),
        },
      },
      { new: true },
    );
  }
}
