import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  // UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
// import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';

@Controller('users')
@ApiTags('Users')
// @UseGuards(AccessTokenGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('/:id?')
  @ApiOperation({
    description: 'find list of users or user with specified id',
  })
  @ApiResponse({
    status: 200,
    description: 'Find all users or find user with specified id',
  })
  @ApiQuery({
    name: 'limit',
    description: 'Limit the number of posts',
    type: 'integer',
    example: 10,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: 'Limit the number of pages',
    type: 'integer',
    example: 1,
    required: false,
  })
  @Auth(AuthType.Bearer)
  getUsers(
    @Param() param: GetUsersParamDto,
    // @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    // @Query('page') page: number,
  ) {
    return this.usersService.findAll(param);
  }

  @Post()
  @Auth(AuthType.None)
  @UseInterceptors(ClassSerializerInterceptor)
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @Auth(AuthType.Bearer)
  updateUser(@Param('id') id: any): string {
    console.log({ id });
    return 'Update user with given ID = ' + id;
  }

  @Auth(AuthType.None)
  @Delete(':id')
  deleteUser(): string {
    return 'Delete user with given ID';
  }

  @Patch(':id')
  patchUser(@Body() patchUserDto: PatchUserDto): PatchUserDto {
    console.log({ patchUserDto });
    return patchUserDto;
  }

  @Post('create-many-users-orm-transaction')
  createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
    return this.usersService.createManyUsers(createManyUsersDto);
  }
}
