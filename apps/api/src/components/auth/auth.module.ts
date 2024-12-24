import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { RoleService } from '../role/role.service';
import { createMongooseFeature } from 'src/core/mongoose-utils';
import { AuthSchemas } from './schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string | number>('JWT_EXPIRES'),
        },
      }),
      imports: [ConfigModule],
    }),
    createMongooseFeature(AuthSchemas),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy, RoleService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
