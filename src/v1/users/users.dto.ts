import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";
import {PostDto} from "../posts/posts.dto";
import {ApiProperty} from "@nestjs/swagger";


export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @ApiProperty()
  password: string;
}

export class UsersDto extends CreateUserDto{
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  id: string


  posts?: PostDto[];

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  createdAt: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  updatedAt: string;
}

