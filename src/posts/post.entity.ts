import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostType } from './enums/post-type.enum';
import { PostStatus } from './enums/post-status.enum';
import { MetaOption } from 'src/meta-options/meta-options.entity';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: PostType,
    nullable: false,
    default: PostType.POST,
  })
  postType: PostType;

  @Column({
    type: 'varchar',
    length: 256,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: PostStatus,
    nullable: false,
    default: PostStatus.DRAFT,
  })
  status: PostStatus;

  @Column({
    type: 'text',
    nullable: true,
  })
  content: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredImageUrl: string;

  @Column({
    type: 'timestamp', // 'datetime' in mysql
    nullable: true,
  })
  publishOn: Date;

  @OneToOne(() => MetaOption, (metaOption) => metaOption.post, {
    // The `cascade: true` option ensures that any operations (e.g., save, remove, update)
    // performed on the parent entity will automatically be propagated to the related `MetaOption` entity.
    // This means that when the parent entity (e.g., Post) is saved, the related MetaOption entity will
    // also be saved, even if it's not explicitly saved by itself.
    // This can be useful for situations where you want to ensure the related entity is managed
    // alongside the parent entity automatically.
    cascade: true, // Enable cascade operations on related MetaOption entity
    eager: true, // Load the related entity eagerly when the parent entity is loaded.
  })
  metaOptions?: MetaOption;

  @ManyToOne(() => User, (user) => user.posts, {
    eager: true, // Load the related entity eagerly when the parent entity is loaded
  })
  author: User;

  // work on these in DB relationship part
  @ManyToMany(() => Tag, (tag) => tag.posts, {
    cascade: true, // Enable cascade operations on related Tag entity
    eager: true, // Load the related entity eagerly when the parent entity is loaded
  })
  @JoinTable()
  tags?: Tag[];
}
