import { Exclude } from 'class-transformer';
import { Post } from 'src/posts/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 80,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: true,
  })
  @Exclude()
  password?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @Exclude()
  googleId?: string;

  @OneToMany(() => Post, (post) => post.author, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  posts?: Post[];
}
