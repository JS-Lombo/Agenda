import { AppDataSource } from "../dbConfig/db";
import { Repository } from "typeorm";
import { Task } from "../models/Task";

export class TaskRepository {
  private repository: Repository<Task>; // Instancia del repositorio Task

  constructor() {
    this.repository = AppDataSource.getRepository(Task);
  }

  async createTask(task: Partial<Task>): Promise<Task> {
    try {
      if (!task.title) {
        throw new Error("El título de la tarea es obligatorio.");
      }
      const newTask = this.repository.create(task);
      return await this.repository.save(newTask);
    } catch (error) {
      console.error("Error al crear la tarea:", error.message);
      throw new Error("No se pudo crear la tarea.");
    }
  }

  async getTasks(): Promise<Task[]> {
    try {
      const tasks = await this.repository.find();
      if (tasks.length === 0) {
        throw new Error("No hay tareas disponibles.");
      }
      return tasks;
    } catch (error) {
      console.error("Error al obtener las tareas:", error.message);
      throw new Error("No se pudieron obtener las tareas.");
    }
  }

  async getTaskById(id: number): Promise<Task | null> {
    try {
      if (!id) {
        throw new Error("El ID de la tarea es obligatorio.");
      }
      const task = await this.repository.findOneBy({ id });
      if (!task) {
        throw new Error(`No se encontró ninguna tarea con el ID ${id}.`);
      }
      return task;
    } catch (error) {
      console.error("Error al obtener la tarea:", error.message);
      throw new Error(`No se pudo obtener la tarea con el ID ${id}.`);
    }
  }

  async updateTask(id: number, updatedFields: Partial<Task>): Promise<Task | null> {
    try {
      if (!id) {
        throw new Error("El ID de la tarea es obligatorio.");
      }
      const task = await this.getTaskById(id);
      if (!task) {
        throw new Error(`No se encontró ninguna tarea con el ID ${id}.`);
      }
      Object.assign(task, updatedFields);
      return await this.repository.save(task);
    } catch (error) {
      console.error("Error al actualizar la tarea:", error.message);
      throw new Error(`No se pudo actualizar la tarea con el ID ${id}.`);
    }
  }

  async deleteTask(id: number): Promise<boolean> {
    try {
      if (!id) {
        throw new Error("El ID de la tarea es obligatorio.");
      }
      const result = await this.repository.delete(id);
      if (result.affected === 0) {
        throw new Error(`No se pudo eliminar la tarea con el ID ${id}.`);
      }
      return true;
    } catch (error) {
      console.error("Error al eliminar la tarea:", error.message);
      throw new Error(`No se pudo eliminar la tarea con el ID ${id}.`);
    }
  }
}
