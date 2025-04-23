import {Controller, Post, UseGuards, Body} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LocalAuthGuard} from "./local.auth.guard";
import {CreateUserDto} from "../users/users.dto";
import {ApiOperation, ApiParam} from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService) {
  }

  @ApiOperation({
    summary: 'Login user operation',
    description: 'Result of user login: an object with access_token field that contains JWT access token',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: { email: string, password: string }) {
    return this.authService.login(user)
  }


  @ApiOperation({
    summary: 'Register user operation',
    description: 'Result of user registration: an object with access_token field that contains JWT access token',
  })
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user)
  }
}
