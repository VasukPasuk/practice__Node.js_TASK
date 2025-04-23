import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {PostsService} from './posts.service';
import {CreatePostDto} from "./posts.dto";
import {JwtAuthGuard} from "../auth/jwt.auth.guard";
import {JWTUserDataType, User} from "../users/users.param.decorator";
import {ApiBearerAuth, ApiOperation} from "@nestjs/swagger";

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {
  }

  @ApiOperation({
    summary: 'Create post operation',
    description: 'Result of user login: an object with access_token field that contains JWT access token',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() post: CreatePostDto, @User() user: JWTUserDataType) {
    return this.postsService.createPost({...post, authorId: user.userId});
  }


  @ApiOperation({
    summary: 'Get all posts operation',
    description: 'Result of user login: array of all posts',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.postsService.getAllPosts()
  }

  @ApiOperation({
    summary: 'Get post operation',
    description: 'Result of user login: searched post by id',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param("id") id: string) {
    return this.postsService.getPostById(id)
  }

  @ApiOperation({
    summary: 'Update post operation',
    description: 'Result of user login: updated post',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@User() user: JWTUserDataType, @Param("id") id: string, @Body() post: CreatePostDto) {
    return this.postsService.updatePostById(id, post, user.userId)
  }

  @ApiOperation({
    summary: 'Delete post operation',
    description: 'Result of user login: deleted post',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOne(@User() user: JWTUserDataType, @Param("id") id: string) {
    return this.postsService.deletePostById(id, user.userId)
  }
}
