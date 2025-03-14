import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { task_priority_type } from "src/infrastructure/models/task/task.entity";

export class CreateTaskDTO{
    @IsNotEmpty()
    @IsString()
    title:string;

    @IsOptional()
    @IsString()
    description:string;

    @IsOptional()
    @IsEnum(task_priority_type)
    priority:task_priority_type;

}