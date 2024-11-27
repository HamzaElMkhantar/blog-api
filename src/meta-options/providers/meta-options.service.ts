import { Injectable } from '@nestjs/common';
import { MetaOption } from '../meta-options.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostMetaOptionsDto } from '../dtos/create-post-meta-options.dto';

/** Class to connect to MetaOption table and perform business operations  */
@Injectable()
export class MetaOptionsService {
  /** constructor to Inject metaOption Repository */
  constructor(
    @InjectRepository(MetaOption)
    private metaOptionRepo: Repository<MetaOption>,
  ) {}

  async create(createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
    const metaOption = this.metaOptionRepo.create(createPostMetaOptionsDto);
    return await this.metaOptionRepo.save(metaOption);
  }

  async delete(id: number) {
    const metaOption = await this.metaOptionRepo.findOne({ where: { id } });
    if (!metaOption) {
      throw new Error('MetaOption not found');
    }
    await this.metaOptionRepo.delete(id);
    return metaOption;
  }
}
