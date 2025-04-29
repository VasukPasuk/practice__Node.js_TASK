import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma.service";
import {CreatePostDto} from "./posts.dto";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {
  }

  async createPost(post: CreatePostDto) {
    return this.prisma.post.create({data: {...post}})
  }

  async getAllPosts() {
    return this.prisma.post.findMany();
  }

  async getPostById(postId: string) {
    return this.prisma.post.findUnique({where: {id: postId}});
  }

  async updatePostById(postId: string, post: Partial<CreatePostDto>, userId: string) {
    const hasRights = await this.checkAccessRightsById(postId, userId)

    if (!hasRights) {
      throw new BadRequestException(`You don't have rights to update this post, because you are not the author of this post.`)
    }

    return this.prisma.post.update({where: {id: postId}, data: {...post}});
  }

  async deletePostById(postId: string, userId: string) {

    const hasRights = await this.checkAccessRightsById(postId, userId)
    if (!hasRights) {
      throw new BadRequestException(`You don't have rights to delete this post, because you are not the author of this post.`)
    }

    return this.prisma.post.delete({where: {id: postId}});
  }

  async checkAccessRightsById(postId: string, userId: string) {
    const post = await this.prisma.post.findUnique({where: {id: postId}})

    if (!post) {
      throw new BadRequestException(`Post with id ${postId} not found.`)
    }

    return userId === post.authorId;
  }
}
