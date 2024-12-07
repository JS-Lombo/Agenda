import { TaskRepository } from "../repositories/taskRepository";
import { Task } from "../models/Task";

export class TaskService{
    private taskRepository : TaskRepository;
    
    constructor(){
        this.taskRepository = new TaskRepository();
    } 

    async createTaskService(title:string, completed:boolean = false):Promise<Task>{
        return await this.taskRepository.createTask({title,completed});
    }

    async getAllTasksService(): Promise<Task[]>{
        return await this.taskRepository.getTasks();
    }

    async gettaskByIdService(id:string):Promise<Task>{
        return await this.taskRepository.getTaskById(id);
    }

    async getTaskById(id: string): Promise<Task | null> {
        return this.taskRepository.getTaskById(id);
      }
    
      async updateTask(id: string, updatedFields: Partial<Task>): Promise<Task | null> {
        return this.taskRepository.updateTask(id, updatedFields);
      }
    


    // async getTaskById(id:string):Promise<Task>{
    //     return await this.taskRepository.getTaskById(id);
    // }

    // async updatetask(id:string,updatedFields:Partial<Task>):Promise<Task|null>{
    //     return await this.taskRepository.updateTask(id,updatedFields);
    // }

    async deleteTask(id:string):Promise<boolean>{
        return await this.taskRepository.deleteTask(id);
    }
}