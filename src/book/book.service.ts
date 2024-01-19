import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    try {
      const book = this.bookRepository.create(createBookDto);

      return await this.bookRepository.save(book);
    } catch (err) {
      return new BadRequestException(err.message);
    }
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  /* findOne(id: number) {
    return `This action returns a #${id} book`;
  } */

  async update(id: string, updateBookDto: UpdateBookDto) {
    if (Object.keys(updateBookDto).length === 0)
      return new BadRequestException('Nenhum dado para atualizar');

    try {
      return await this.bookRepository.update(id, updateBookDto);
    } catch (err) {
      return new BadRequestException(err.message);
    }
  }

  remove(id: string) {
    try {
      return this.bookRepository.delete(id);
    } catch (err) {
      return new BadRequestException('ID não encontrado');
    }
  }
}
