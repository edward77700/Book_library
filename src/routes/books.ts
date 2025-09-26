import { FastifyInstance } from "fastify";
import { BookService } from "../services/bookService";

type CreateBookBody = {
    title: string;
    authorId: string;
};

type BookParams = { id: string };

const bookSchemeBody = {
    type: "object",
    required: ["title", "authorId"],
    properties: {
        title: { type: "string", minLength: 1 }, // 🔑 must not be empty
        authorId: { type: "string", minLength: 1},
    },
    additionalProperties: false,
}

const bookSchemeParams = {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", minLength: 1 }, // could add "format": "uuid" if you use UUIDs
    },
    additionalProperties: false,
}

const createBookScheme = {
    body: bookSchemeBody,
}

const updateBookScheme = {
    params: bookSchemeParams,
    body: bookSchemeBody,
}

export async function bookRoutes(fastify: FastifyInstance) {
    const bookService = new BookService();

    fastify.get("/books", async (_request, reply) => {
        const books = await bookService.findAll();
        reply.send(books);
    });

    fastify.get("/books/:id", async (request, reply) => {
        const id = (request.params as any).id;
        const book = await bookService.findOne(id);
        reply.send(book);
    });

    fastify.post<{ Body: CreateBookBody }>(
        "/books",
        { schema: createBookScheme },
        async (request, reply) => {
          const { title, authorId } = request.body;
          const book = await bookService.create(title, Number(authorId));
          reply.send(book);
        }
    );

    fastify.put<{ Params: BookParams; Body: CreateBookBody }>(
        "/books/:id",
        { schema: updateBookScheme },
        async (request, reply) => {
            const { id } = request.params;
            const { title, authorId } = request.body;
            const book = await bookService.update(Number(id), title, Number(authorId));
            reply.send(book);
    });


    fastify.delete("/books/:id", async (request, reply) => {
        const id = (request.params as any).id;
        await bookService.delete(id);
        reply.send({ message: "Book deleted" });
    });
}
