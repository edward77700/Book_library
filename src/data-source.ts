import "reflect-metadata";
import { DataSource } from "typeorm";
import { Book } from "./entities/Book";
import { Author } from "./entities/Author";

const DB_HOST = "postgres.railway.internal"
const DB_PORT = 5432
const DB_USERNAME = "postgres"
const DB_PASSWORD = "CeYYbEZXfCmJGJFHMNnQrMHSXqPcvXyY"
const DB_NAME = "railway"

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
