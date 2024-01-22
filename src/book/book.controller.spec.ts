import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

const bookEntityList: Book[] = [
  new Book({ id: 'aaa', name: 'Exemplo', author: 'asdasd' }),
  new Book({ id: 'aab', name: 'EXEMPLO', author: 'asdasd' }),
  new Book({ id: 'aac', name: 'Example', author: 'asdasd' }),
];

const newBookEntity: Book = new Book({
  author: 'asdasd',
  name: 'Exemplo',
  isbn: '123123123',
});

const updatedBookEntity: Book = new Book({
  author: 'atualizado',
  name: 'atualizado',
  isbn: 'atualizado',
});

describe('BookController', () => {
  let bookController: BookController;
  let bookService: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            create: jest.fn().mockResolvedValue(newBookEntity),
            findAll: jest.fn().mockResolvedValue(bookEntityList),
            update: jest.fn().mockResolvedValue(updatedBookEntity),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    bookController = module.get<BookController>(BookController);
    bookService = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(bookController).toBeDefined();
    expect(bookService).toBeDefined();
  });

  describe('create()', () => {
    it('should create a book', async () => {
      const body: CreateBookDto = {
        name: 'Exemplo',
        author: 'asdasd',
        isbn: '123123123',
      };

      const result = await bookController.create(body);

      expect(result).toEqual(newBookEntity);
      expect(bookService.create).toHaveBeenCalledTimes(1);
      expect(bookService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an error', async () => {
      jest.spyOn(bookService, 'create').mockRejectedValueOnce(new Error());
      const body: CreateBookDto = {
        name: '',
        author: '',
        isbn: '',
      };

      expect(bookController.create(body)).rejects.toThrow();
    });
  });

  describe('update()', () => {
    it('should update a book', async () => {
      const body: CreateBookDto = {
        name: 'atual',
        author: 'atual',
        isbn: 'atual',
      };

      const result = await bookController.update('aaa', body);

      expect(result).toEqual(updatedBookEntity);
      expect(bookService.update).toHaveBeenCalledTimes(1);
      expect(bookService.update).toHaveBeenCalledWith('aaa', body);
    });

    it('should throw an error', () => {
      jest.spyOn(bookService, 'update').mockRejectedValueOnce(new Error());

      expect(
        bookController.update('aaa', {} as CreateBookDto),
      ).rejects.toThrow();
    });
  });

  describe('remove()', () => {
    it('should remove a book', async () => {
      const result = await bookController.remove('aaa');

      expect(result).toEqual(undefined);
      expect(bookService.remove).toHaveBeenCalledTimes(1);
      expect(bookService.remove).toHaveBeenCalledWith('aaa');
    });

    it('should throw an error', () => {
      jest.spyOn(bookService, 'remove').mockRejectedValueOnce(new Error());

      expect(bookController.remove('aaa')).rejects.toThrow();
    });
  });
});
