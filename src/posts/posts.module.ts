import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOptionsModule } from 'src/meta-options/meta-options.module';
import { TagModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreatePostService } from './providers/create-post.service';

@Module({
  imports: [
    UsersModule,
    MetaOptionsModule,
    TagModule,
    TypeOrmModule.forFeature([Post]),
    PaginationModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, CreatePostService],
})
export class postsModule {}
