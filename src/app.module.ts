import { Module } from '@nestjs/common';
import {AppV1Module} from "./v1/app.v1.module";
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from "./v1/auth/auth.module";

@Module({
  imports: [AppV1Module, ConfigModule.forRoot({
    isGlobal: true,
  }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
