import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  isbn: string;
}
