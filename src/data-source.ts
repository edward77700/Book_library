import "reflect-metadata";
import { DataSource } from "typeorm";
import { Book } from "./entities/Book";
import { Author } from "./entities/Author";

const DB_HOST = process.env.DATABASE_HOST || "localhost"
const DB_PORT = Number(process.env.DATABASE_PORT) || 5431
const DB_USERNAME = process.env.DATABASE_USERNAME || "myuser"
const DB_PASSWORD = process.env.DATABASE_PASSWORD || "mypassword"
const DB_NAME = process.env.DATABASE_NAME || "mydatabase"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Book, Author],
    migrations: [],
    subscribers: [],
})
