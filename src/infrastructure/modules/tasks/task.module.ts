import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "src/infrastructure/models/task/task.entity";
import { jwtModule } from "../jwt/jwt.module";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { ResponseService } from "src/common/response-manager/response.manager";

@Module({
    imports:[TypeOrmModule.forFeature([Task]),
    jwtModule
    ],
    controllers:[TaskController],
    providers:[TaskService,ResponseService],
    exports:[TaskService]
})

export class TaskModule {}