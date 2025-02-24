import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException, UseGuards } from "@nestjs/common";
import { ApiResponse, ResponseService } from "src/common/response-manager/response.manager";
import { UserEntity } from "src/infrastructure/models/user/user.entity";
import { Repository } from "typeorm";
import { JwtAuthGuard } from "../jwt/jwt.auth.guard";

@Injectable()

export class UserService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository:Repository<UserEntity>,
        private readonly responseService:ResponseService
    ){}

    async fetchUsers():Promise<ApiResponse<UserEntity[]>>{
        try {
            const users = await this.userRepository.find()

            if(users.length === 0){
                throw new NotFoundException('no data found for users')
            }
            return this.responseService.success(users);
        } catch (error) {
            return error;
        }
    }
}