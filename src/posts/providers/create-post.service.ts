import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { TagService } from 'src/tags/providers/tags.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class CreatePostService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tagService: TagService,
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async createPost(createPostDto: CreatePostDto, user: ActiveUserData) {
    try {
      // find the author first before creating the post.
      const author = await this.usersService.findOneById(user.sub);
      const tags = await this.tagService.findMultipleTags(createPostDto.tags);

      //? not needed because the user will never be able to create a new post without the authenticated and valid token
      //   if (!author) {
      //     throw new NotFoundException('No author found');
      //   }

      if (createPostDto?.tags?.length !== tags.length) {
        throw new BadRequestException('Please check your tags Ids');
      }

      /**
        //! The code is commented out because `cascade: true` in the `@OneToOne` relation automatically handles
        //! saving the related `metaOptions` when the `post` is saved. Thus, manually assigning and saving the
        //! `metaOptions` is unnecessary.
       */

      // const metaOption = createPostDto.metaOptions
      // / ? await this.metaOptionsService.create(createPostDto.metaOptions)
      //   : null;

      const post = this.postRepo.create({ ...createPostDto, author, tags });

      // if (metaOption) {
      //   post.metaOptions = metaOption;
      // }

      await this.postRepo.save(post);
      return { message: 'Post created successfully', post };
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
