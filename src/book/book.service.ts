import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { regexISBN } from 'src/utils/regex-ISBN';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    //verificar string atraves de um regex
    if(regexISBN.test(createBookDto.isbn.replaceAll('-', '')) === false) {
      return new BadRequestException('ISBN inválido');
    }

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

  async paginate(options: IPaginationOptions): Promise<Pagination<Book>> {
    const query = this.bookRepository.createQueryBuilder('q');
    query.orderBy('q.name', 'DESC');

    return paginate<Book>(query,options)
  }

  /* findOne(id: number) {
    return `This action returns a #${id} book`;
  } */

  async update(id: string, updateBookDto: UpdateBookDto) {
    if (Object.keys(updateBookDto).length === 0)
      return new BadRequestException('Nenhum dado para atualizar');

    if(regexISBN.test(updateBookDto.isbn.replaceAll('-', '')) === false) {
      return new BadRequestException('ISBN inválido');
    }

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
