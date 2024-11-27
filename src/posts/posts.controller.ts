import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  // Req,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
// import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constant';
// import { Auth } from 'src/auth/decorators/auth.decorator';
// import { AuthType } from 'src/auth/enums/auth-type.enum';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.getAll();
  }

  @Get('/:userId')
  getPost(@Param('userId') userId: string, @Query() postQuery: GetPostsDto) {
    console.log(postQuery);
    return this.postsService.findAll(postQuery, userId);
  }

  @ApiOperation({
    summary: 'Create a new blog post',
  })
  @ApiResponse({
    description:
      'your get a 201 response if your post has been created successfully',
    status: 201,
  })
  @ApiBody({
    type: CreatePostDto,
    description: 'Create a new post',
  })
  @Post('create')
  // @Auth(AuthType.Bearer)
  createPost(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    console.log({ user });
    return this.postsService.createPost(createPostDto, user);
    // console.log({ user1: request.user });
    // console.log({ reqUser: request[REQUEST_USER_KEY] });
    // return 'Create a new post';
  }

  @Patch('update')
  @ApiOperation({
    summary: 'Update existing blog post',
  })
  @ApiResponse({
    description:
      'your get a 200 response if your post has been updated successfully',
    status: 200,
  })
  updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.update(patchPostDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a blog post',
  })
  @ApiResponse({
    description:
      'your get a 200 response if your post has been deleted successfully',
    status: 200,
  })
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
