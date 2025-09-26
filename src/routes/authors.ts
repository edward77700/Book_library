import { FastifyInstance } from "fastify";
import { AuthorService } from "../services/authorService";

type CreateAuthorBody = { name: string };
type AuthorParams = { id: string };

const authorSchemeBody = {
    type: "object",
    required: ["name"],
    properties: {
        name: { type: "string", minLength: 1 }, // 🔑 must not be empty
    },
    additionalProperties: false,
}

const authorSchemeParams = {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", minLength: 1 }, // could add "format": "uuid" if you use UUIDs
    },
    additionalProperties: false,
}

const createAuthorScheme = {
    body: authorSchemeBody,
}

const updateAuthorScheme = {
    params: authorSchemeParams,
    body: authorSchemeBody,
}

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

    fastify.post<{ Body: CreateAuthorBody }>(
        "/authors",
        { schema: createAuthorScheme },
        async (request, reply) => {
          const { name } = request.body;
          const author = await authorService.create(name);
          reply.send(author);
        }
    );

    fastify.put<{ Params: AuthorParams; Body: CreateAuthorBody }>(
        "/authors/:id",
        { schema: updateAuthorScheme },
        async (request, reply) => {
            const { id } = request.params;
            const { name } = request.body;
      
            const author = await authorService.update(Number(id), name);
            reply.send(author);
        }
    );

    fastify.delete("/authors/:id", async (request, reply) => {
        const id = (request.params as any).id;
        await authorService.delete(id);
        reply.send({ message: "Author deleted" });
    });
}
