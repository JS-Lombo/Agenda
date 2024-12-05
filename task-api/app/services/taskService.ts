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

    async gettaskByIdService(id:number):Promise<Task>{
        return await this.taskRepository.getTaskById(id);
    }

    async getTaskById(id:number):Promise<Task>{
        return await this.taskRepository.getTaskById(id);
    }

    async updatetask(id:number,updatedFields:Partial<Task>):Promise<Task|null>{
        return await this.taskRepository.updateTask(id,updatedFields);
    }

    async deleteTask(id:number):Promise<boolean>{
        return await this.taskRepository.deleteTask(id);
    }
}