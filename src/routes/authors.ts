import { FastifyInstance } from "fastify";
import { AuthorService } from "../services/authorService";

export async function authorRoutes(fastify: FastifyInstance) {
    const authorService = new AuthorService();

    fastify.get("/authors", async (request, reply) => {
        const authors = await authorService.findAll();
        reply.send(authors);
    });

    fastify.get("/authors/:id", async (request, reply) => {
        const id = (request.params as any).id;
        const author = await authorService.findOne(id);
        reply.send(author);
    });

    fastify.post("/authors", async (request, reply) => {
        const { name } = request.body as any;
        const author = await authorService.create(name);
        reply.send(author);
    });

    fastify.put("/authors/:id", async (request, reply) => {
        const id = (request.params as any).id;
        const { name } = request.body as any;
        const author = await authorService.update(id, name);
        reply.send(author);
    });

    fastify.delete("/authors/:id", async (request, reply) => {
        const id = (request.params as any).id;
        await authorService.delete(id);
        reply.send({ message: "Author deleted" });
    });
}
