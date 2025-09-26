import fastify from "fastify";
import cors from '@fastify/cors';
import { AppDataSource } from "./data-source";
import { authorRoutes } from "./routes/authors";
import { bookRoutes } from "./routes/books";

const server = fastify();

// set cors settings
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// set error msg for validation
server.setErrorHandler((error, request, reply) => {
    if (error.validation) {
      // Custom formatting
      const message = error.validation
        .map((e) => {
            if (e.instancePath === "/name" && e.keyword === "minLength") {
                return "Author name cannot be empty";
            }
            if (e.instancePath === "/title" && e.keyword === "minLength") {
                return "Book title cannot be empty";
            }
            if (e.instancePath === "/authorId" && e.keyword === "minLength") {
                return "Author cannot be empty";
            }
            if (e.keyword === "required") {
                return `Missing field: ${e.params.missingProperty}`;
            }
            return e.message ?? "Invalid request";
        })
        .join(", ");
  
      reply.status(400).send({
        statusCode: 400,
        error: "Bad Request",
        message,
      });
    } else {
      // default
      reply.send(error);
    }
});

// register routes
server.register(authorRoutes);
server.register(bookRoutes);

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
    server.listen({ port: 3001 }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
}).catch((error) => console.log(error));
