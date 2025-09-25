import "reflect-metadata";
import { DataSource } from "typeorm";
import { Book } from "./entities/Book";
import { Author } from "./entities/Author";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5431,
    username: "myuser",
    password: "mypassword",
    database: "mydatabase",
    synchronize: true,
    logging: false,
    entities: [Book, Author],
    migrations: [],
    subscribers: [],
})
