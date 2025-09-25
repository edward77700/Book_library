import fastify from "fastify";
import cors from '@fastify/cors';
import { AppDataSource } from "./data-source";
import { authorRoutes } from "./routes/authors";
import { bookRoutes } from "./routes/books";

const server = fastify();
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

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
