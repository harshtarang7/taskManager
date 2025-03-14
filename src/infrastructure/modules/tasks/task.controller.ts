import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create.task.dto';
import {
  ApiResponse,
  ResponseService,
} from 'src/common/response-manager/response.manager';
import { Task } from 'src/infrastructure/models/task/task.entity';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private responseService: ResponseService,
  ) {}

  @Post('/create-task')
  async createTask(@Body() dto: CreateTaskDTO): Promise<ApiResponse<Task>> {
    try {
      const task = await this.taskService.createTask(dto);

      return task;
    } catch (error) {
        console.log(error)
        return this.responseService.error(error)
    }
  }
}
