import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma.service";
import {CreateUserDto, UsersDto} from "../users/users.dto";
import {JwtService} from "@nestjs/jwt";
import {JWTUserDataType} from "../users/users.param.decorator";
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {
  }


  async login(user: { email: string, password: string }) {
    const dbUser = await this.usersService.getByEmail(user.email)

    if (!dbUser) {
      throw new BadRequestException(`User with ${user.email} already exists`)
    }

    const token = await this.generateAccessToken({email: dbUser.email, userId: dbUser.id})
    return {
      access_token: token,
    }
  }

  async register(user: CreateUserDto) {
    const createdUser = await this.usersService.createUser(user);
    const token = await this.generateAccessToken({email: createdUser.email, userId: createdUser.id})
    return {
      access_token: token,
    }
  }

  async generateAccessToken(payload: JWTUserDataType) {
    return this.jwtService.sign(payload)
  }
}
