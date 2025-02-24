import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/infrastructure/models/user/user.entity";
import {jwtModule} from '../jwt/jwt.module'
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { ResponseService } from "src/common/response-manager/response.manager";
@Module({
    imports:[
        TypeOrmModule.forFeature([UserEntity]),
        jwtModule
    ],
    controllers:[UserController],
    providers:[UserService, ResponseService],
    exports:[UserService]
})

export class UserModule {}