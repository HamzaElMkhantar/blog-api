import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { TagService } from './providers/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagService) {}

  @Post('create')
  createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Delete(':id')
  deleteTag(@Param('id') id: string) {
    return this.tagService.delete(+id);
  }

  @Delete('soft-delete/:id')
  softDeleteTag(@Param('id') id: string) {
    return this.tagService.softDelete(+id);
  }
}
