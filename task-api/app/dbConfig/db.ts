import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "../models/Task";

export const AppDataSource = new DataSource({
  type: "postgres", // Cambia esto si usas otra base de datos
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, // Cambia a false en producción
  logging: true,
  entities: [Task],
});
