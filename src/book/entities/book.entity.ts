import { AbstractEntity } from 'src/common/entities';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'books' })
export class Book extends AbstractEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  author: string;

  @Column({ unique: true, nullable: false })
  isbn: string;
}
