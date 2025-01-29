import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/infrastructure/models/user/user.entity";
import { jwtModule } from "../jwt/jwt.module";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([UserEntity]),
        jwtModule,
    ],
    controllers:[LoginController],
    providers:[LoginService],
    exports:[LoginService]
})

export class LoginModule{}