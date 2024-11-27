import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagService } from './providers/tags.service';

@Module({
  providers: [TagService],
  exports: [TagService],
  controllers: [TagsController],
  imports: [TypeOrmModule.forFeature([Tag])],
})
export class TagModule {}
