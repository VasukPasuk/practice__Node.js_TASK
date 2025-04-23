import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma.service";

import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "./users.dto";

const SALT = 12

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService
  ) {
  }

  async createUser({email, password}: CreateUserDto) {
    const isExist = await this.getByEmail(email)
    if (isExist) {
      throw new BadRequestException(`User with ${email} already exists`)
    }

    const hashedPassword = await bcrypt.hash(password, SALT);

    return this.prisma.user.create({
      data: {email, password: hashedPassword}
    })
  }

  async getByEmail(email: string) {
    return (await this.prisma.user.findUnique({where: {email: email}})) || false
  }
}
