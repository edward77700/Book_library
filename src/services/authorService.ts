import { AppDataSource } from "../data-source";
import { Author } from "../entities/Author";

export class AuthorService {
    private authorRepository = AppDataSource.getRepository(Author);

    async findAll() {
        return this.authorRepository.find();
    }

    async findOne(id: number) {
        return this.authorRepository.findOne({ where: { id } })
    }

    async create(name: string) {
        const author = new Author();
        author.name = name;
        return this.authorRepository.save(author);
    }

    async update(id: number, name: string) {
        let author = await this.authorRepository.findOne({ where: { id } });
        if (author) {
            author.name = name;
            return this.authorRepository.save(author);
        }
        return null;
    }

    async delete(id: number) {
        return this.authorRepository.delete(id);
    }
}
