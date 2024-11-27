import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { MetaOptionsService } from '../../meta-options/providers/meta-options.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { TagService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationService } from 'src/common/pagination/providers/pagination.service';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreatePostService } from './create-post.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    private readonly metaOptionsService: MetaOptionsService,
    private readonly usersService: UsersService,
    private readonly tagService: TagService,
    private readonly paginationService: PaginationService,
    private readonly createPostService: CreatePostService,
  ) {}

  async createPost(createPostDto: CreatePostDto, user: ActiveUserData) {
    return this.createPostService.createPost(createPostDto, user);
  }

  getAll() {}

  findOne(userId: string, limit: number, page: number): any {
    console.log({ userId: userId, limit: limit, page: page });
  }

  async findAll(
    postQuery: GetPostsDto,
    userId: string,
  ): Promise<Paginated<Post>> {
    try {
      const user = await this.usersService.findOneById(+userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      // const posts = await this.postRepo.find({
      //   // relations: {
      //   //   metaOptions: true,
      //   //   // author: true, //? we already set eager to true in ManyToMany relations in post entity
      //   //   // tags: true, //? we already set eager to true in ManyToMany relations in post entity
      //   // },
      //   skip: (postQuery.page - 1) * postQuery.limit,
      //   take: postQuery.limit,
      // });

      const posts = await this.paginationService.paginateQuery<Post>(
        postQuery,
        this.postRepo,
      );

      return posts;
    } catch (err) {
      console.error('Service error during finding all posts:', err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An unexpected error occurred while finding all posts.',
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number) {
    const post = await this.postRepo.findOneBy({ id });
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    await this.postRepo.delete(id);
    // await this.metaOptionsService.delete(post.metaOptions.id);

    return { message: 'Post deleted successfully', post };
  }

  async update(patchPostDto: PatchPostDto) {
    try {
      const tags = await this.tagService.findMultipleTags(patchPostDto.tags);
      if (!tags && tags.length !== patchPostDto.tags.length) {
        throw new BadRequestException(
          'Please check the tags Ids ensures that the tags are valid',
        );
      }

      const post = await this.postRepo.findOneBy({ id: patchPostDto.id });
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      post.title = patchPostDto.title ?? post.title;
      post.postType = patchPostDto.postType ?? post.postType;
      post.slug = patchPostDto.slug ?? post.slug;
      post.status = patchPostDto.status ?? post.status;
      post.content = patchPostDto.content ?? post.content;
      post.schema = patchPostDto.schema ?? post.schema;
      post.featuredImageUrl =
        patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
      post.publishOn = patchPostDto.publishOn ?? post.publishOn;

      post.tags = tags;

      return await this.postRepo.save(post);
    } catch (error) {
      console.error('Service error during updating post:', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An unexpected error occurred while updating the post.',
          details: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
