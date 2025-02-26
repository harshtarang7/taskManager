import { InjectRepository } from "@nestjs/typeorm";
import { Inject, Injectable, Logger, NotFoundException, UseGuards } from "@nestjs/common";
import { ApiResponse, ResponseService } from "src/common/response-manager/response.manager";
import { UserEntity } from "src/infrastructure/models/user/user.entity";
import { Repository } from "typeorm";
import { JwtAuthGuard } from "../jwt/jwt.auth.guard";
import { instanceToPlain } from "class-transformer";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { LoggerService } from "src/common/utils/logger/logger.service";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository:Repository<UserEntity>,
        private readonly responseService:ResponseService,
        private readonly loggerService: LoggerService
    ){}

    async fetchUsers():Promise<ApiResponse<UserEntity[]>>{
        this.loggerService.log('finding all users')
        try {
            const users = await this.userRepository.find()

            this.loggerService.debug(`Found ${users.length} users`);
            if(users.length === 0){
                throw new NotFoundException('no data found for users')
            }
            const secureUsers = instanceToPlain(users) as UserEntity[];
            return this.responseService.success(secureUsers);
        } catch (error) {
            this.loggerService.error(`Error finding users: ${error.message}`, error.stack);
            return error;
        }
    }

}