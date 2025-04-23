import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException(`User ${email} not found.`);
    }

    const isValidPassword = user ? await bcrypt.compare(password, user.password) : false;

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    const { password: _, ...result } = user;
    return result;
  }
}
