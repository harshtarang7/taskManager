import {Controller, Get, NotFoundException, UseGuards} from '@nestjs/common'
import { UserService } from './user.service';
import { ApiResponse, ResponseService } from 'src/common/response-manager/response.manager';
import { UserEntity } from 'src/infrastructure/models/user/user.entity';
import { JwtAuthGuard } from '../jwt/jwt.auth.guard';

@Controller('user')
export class UserController{
    constructor(
        private userService:UserService,
        private responseService:ResponseService
    ){}

    @Get("/get-users")
    async getUsers():Promise<ApiResponse<UserEntity[]>>{
        try {
            const users = await this.userService.fetchUsers()

            return users
        } catch (error) {
            if (error instanceof NotFoundException) {
                return this.responseService.error(error.message);
              }
              return this.responseService.error('Failed to get the users');
        }
    }
}