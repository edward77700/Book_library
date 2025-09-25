import { FastifyInstance } from "fastify";
import { BookService } from "../services/bookService";

export async function bookRoutes(fastify: FastifyInstance) {
    const bookService = new BookService();

    fastify.get("/books", async (request, reply) => {
        const books = await bookService.findAll();
        reply.send(books);
    });

    fastify.get("/books/:id", async (request, reply) => {
        const id = (request.params as any).id;
        const book = await bookService.findOne(id);
        reply.send(book);
    });

    fastify.post("/books", async (request, reply) => {
        const { title, authorId } = request.body as any;
        const book = await bookService.create(title, authorId);
        reply.send(book);
    });

    fastify.put("/books/:id", async (request, reply) => {
        const id = (request.params as any).id;
        const { title, authorId } = request.body as any;
        const book = await bookService.update(id, title, authorId);
        reply.send(book);
    });

    fastify.delete("/books/:id", async (request, reply) => {
        const id = (request.params as any).id;
        await bookService.delete(id);
        reply.send({ message: "Book deleted" });
    });
}
