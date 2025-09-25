import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book";
import { Author } from "../entities/Author";

export class BookService {
    private bookRepository = AppDataSource.getRepository(Book);
    private authorRepository = AppDataSource.getRepository(Author);

    async findAll() {
        return this.bookRepository.find({ relations: ["author"] });
    }

    async findOne(id: number) {
        return this.bookRepository.findOne({ where: { id }, relations: ["author"] });
    }

    async create(title: string, authorId: number) {
        const author = await this.authorRepository.findOne({ where: { id: authorId } });
        if (author) {
            const book = new Book();
            book.title = title;
            book.author = author;
            return this.bookRepository.save(book);
        }
        return null;
    }

    async update(id: number, title: string, authorId: number) {
        const author = await this.authorRepository.findOne({ where: { id: authorId } });
        if (author) {
            let book = await this.bookRepository.findOne({ where: { id } });
            if (book) {
                book.title = title;
                book.author = author;
                return this.bookRepository.save(book);
            }
        }
        return null;
    }

    async delete(id: number) {
        return this.bookRepository.delete(id);
    }
}
