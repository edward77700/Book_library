import { AuthorService } from '../services/authorService';

const mockAuthorRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

jest.mock('../data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(() => mockAuthorRepository),
  },
}));

describe('AuthorService', () => {
  let authorService: AuthorService;

  beforeEach(() => {
    authorService = new AuthorService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all authors', async () => {
    const authors = [{ id: 1, name: 'Author 1' }];
    mockAuthorRepository.find.mockResolvedValue(authors);

    const result = await authorService.findAll();

    expect(result).toEqual(authors);
    expect(mockAuthorRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should return a single author', async () => {
    const author = { id: 1, name: 'Author 1' };
    mockAuthorRepository.findOne.mockResolvedValue(author);

    const result = await authorService.findOne(1);

    expect(result).toEqual(author);
    expect(mockAuthorRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should create a new author', async () => {
    const author = { name: 'New Author' };
    mockAuthorRepository.save.mockResolvedValue(author);

    const result = await authorService.create('New Author');

    expect(result).toEqual(author);
    expect(mockAuthorRepository.save).toHaveBeenCalledWith({ name: 'New Author' });
  });

  it('should update an author', async () => {
    const author = { id: 1, name: 'Updated Author' };
    mockAuthorRepository.findOne.mockResolvedValue({ id: 1, name: 'Author 1' });
    mockAuthorRepository.save.mockResolvedValue(author);

    const result = await authorService.update(1, 'Updated Author');

    expect(result).toEqual(author);
    expect(mockAuthorRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(mockAuthorRepository.save).toHaveBeenCalledWith({ id: 1, name: 'Updated Author' });
  });

  it('should delete an author', async () => {
    mockAuthorRepository.delete.mockResolvedValue({ affected: 1 });

    await authorService.delete(1);

    expect(mockAuthorRepository.delete).toHaveBeenCalledWith(1);
  });
});
