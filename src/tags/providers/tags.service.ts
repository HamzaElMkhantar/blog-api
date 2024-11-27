import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    console.log({ createTagDto });
    const tag = this.tagRepository.create(createTagDto);
    const savedTag = await this.tagRepository.save(tag);
    return { message: 'tags created successfully', savedTag };
  }

  async findMultipleTags(tags: number[]) {
    const result = await this.tagRepository.find({
      where: {
        id: In(tags),
      },
    });

    return result;
  }

  async delete(id: number) {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new Error('Tag not found');
    }
    await this.tagRepository.delete(id);
    return { message: 'Tag deleted successfully' };
  }

  async softDelete(id: number) {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new Error('Tag not found');
    }
    this.tagRepository.softDelete(id);
    await this.tagRepository.save(tag);
    return { message: 'Tag soft deleted successfully' };
  }
}
