import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {PostsService} from './posts.service';
import {CreatePostDto} from './posts.dto';
import {JwtAuthGuard} from '../auth/jwt.auth.guard';
import {JWTUserDataType, User} from '../users/users.param.decorator';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('Posts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {
  }

  @Post()
  @ApiOperation({
    summary: 'Create a post',
    description: 'Creates a post for the authenticated user',
  })
  async create(@Body() post: CreatePostDto, @User() user: JWTUserDataType) {
    return this.postsService.createPost({...post, authorId: user.userId});
  }

  @Get()
  @ApiOperation({
    summary: 'Get all posts',
    description: 'Returns an array of all posts',
  })
  async getAll() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a single post',
    description: 'Returns the post with the specified ID',
  })
  async getOne(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a post',
    description: 'Updates the specified post if owned by the authenticated user',
  })
  async update(
    @Param('id') id: string,
    @Body() post: CreatePostDto,
    @User() user: JWTUserDataType,
  ) {
    return this.postsService.updatePostById(id, post, user.userId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a post',
    description: 'Deletes the specified post if owned by the authenticated user',
  })
  async deleteOne(@Param('id') id: string, @User() user: JWTUserDataType) {
    return this.postsService.deletePostById(id, user.userId);
  }
}
