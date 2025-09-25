import { BookService } from '../services/bookService';
import { Book } from '../entities/Book';
import { Author } from '../entities/Author';

const mockBookRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

const mockAuthorRepository = {
  findOne: jest.fn(),
};

jest.mock('../data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn((entity) => {
      if (entity === Book) {
        return mockBookRepository;
      }
      if (entity === Author) {
        return mockAuthorRepository;
      }
    }),
  },
}));

describe('BookService', () => {
  let bookService: BookService;

  beforeEach(() => {
    bookService = new BookService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all books', async () => {
    const books = [{ id: 1, title: 'Book 1', author: { id: 1, name: 'Author 1' } }];
    mockBookRepository.find.mockResolvedValue(books);

    const result = await bookService.findAll();

    expect(result).toEqual(books);
    expect(mockBookRepository.find).toHaveBeenCalledWith({ relations: ['author'] });
  });

  it('should return a single book', async () => {
    const book = { id: 1, title: 'Book 1', author: { id: 1, name: 'Author 1' } };
    mockBookRepository.findOne.mockResolvedValue(book);

    const result = await bookService.findOne(1);

    expect(result).toEqual(book);
    expect(mockBookRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['author'] });
  });

  it('should create a new book', async () => {
    const author = { id: 1, name: 'Author 1' };
    const book = { title: 'New Book', author };
    mockAuthorRepository.findOne.mockResolvedValue(author);
    mockBookRepository.save.mockResolvedValue(book);

    const result = await bookService.create('New Book', 1);

    expect(result).toEqual(book);
    expect(mockAuthorRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(mockBookRepository.save).toHaveBeenCalledWith({ title: 'New Book', author });
  });

  it('should update a book', async () => {
    const author = { id: 1, name: 'Author 1' };
    const book = { id: 1, title: 'Updated Book', author };
    mockBookRepository.findOne.mockResolvedValue({ id: 1, title: 'Book 1', author });
    mockAuthorRepository.findOne.mockResolvedValue(author);
    mockBookRepository.save.mockResolvedValue(book);

    const result = await bookService.update(1, 'Updated Book', 1);

    expect(result).toEqual(book);
    expect(mockBookRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(mockAuthorRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(mockBookRepository.save).toHaveBeenCalledWith({ id: 1, title: 'Updated Book', author });
  });

  it('should delete a book', async () => {
    mockBookRepository.delete.mockResolvedValue({ affected: 1 });

    await bookService.delete(1);

    expect(mockBookRepository.delete).toHaveBeenCalledWith(1);
  });
});
