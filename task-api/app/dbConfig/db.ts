import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "../models/Task";
import { User } from "../models/User";

export const AppDataSource = new DataSource({
  type: "postgres", // Cambia esto si usas otra base de datos
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Cambia a false en producción
  logging: false,
  entities: [Task,User],
  dropSchema:true
});
