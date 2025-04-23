import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from './local.strategy';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtStrategy} from './jwt.strategy';
import {PrismaService} from '../../prisma.service';
import {UsersModule} from "../users/users.module";

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: '15m' },
      }),
      inject: [ConfigService],
    }),
    UsersModule
  ],
  providers: [AuthService, PrismaService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {
}
