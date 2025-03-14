import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task, task_priority_type } from "src/infrastructure/models/task/task.entity";
import { Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create.task.dto";
import { ApiResponse, ResponseService } from "src/common/response-manager/response.manager";
import { DateTimeHelper } from "src/common/utils/date.time.helper";

@Injectable()
export class TaskService{
 constructor(
    @InjectRepository(Task)
    private readonly taskRepository:Repository<Task>,
    private readonly responseService:ResponseService,
 ){}

 async createTask(dto:CreateTaskDTO):Promise<ApiResponse<Task>>{
    try {
        const newTask = new Task();
        newTask.title = dto.title;
        newTask.description = dto.description;
        newTask.priority = dto.priority || task_priority_type.low;
        newTask.status= 'TODO'
        newTask.created_at= DateTimeHelper.getCurrentDateTime();
        newTask.updated_at = DateTimeHelper.getCurrentDateTime();
        newTask.active = true;
    
        const savedTask = await this.taskRepository.save(newTask);
        return this.responseService.success(savedTask);
    } catch (error) {
        console.log(error);
        return this.responseService.error(error)
    }
 }

    
   
}