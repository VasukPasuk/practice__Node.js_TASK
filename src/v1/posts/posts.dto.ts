import {UsersDto} from "../users/users.dto";
import {IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @ApiProperty()
  content: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @ApiProperty()
  authorId: string;
}

export class PostDto extends CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  id: string;

  @ValidateNested()
  author?: UsersDto;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  createdAt: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  updatedAt: string;
}

