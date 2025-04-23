import {Module} from '@nestjs/common';
import {PostsService} from "./posts/posts.service";
import {PostsController} from "./posts/posts.controller";
import {AuthController} from "./auth/auth.controller";
import {AuthService} from "./auth/auth.service";
import {PrismaService} from "../prisma.service";
import {RouterModule} from "@nestjs/core";
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [RouterModule.register([
    {
      path: 'v1',
      module: AppV1Module,
    },
  ]), AuthModule],
  controllers: [PostsController, AuthController],
  providers: [PrismaService, PostsService],
})
export class AppV1Module {
}
