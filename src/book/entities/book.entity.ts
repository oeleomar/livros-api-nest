import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  author: string;

  @Column({ unique: true, nullable: false })
  isbn: string;

  constructor(partial: Partial<Book>) {
    this.id = partial?.id;
    this.createdAt = partial?.createdAt;
    this.name = partial?.name;
    this.author = partial?.author;
    this.isbn = partial?.isbn;
  }
}
