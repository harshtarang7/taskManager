import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/infrastructure/models/user/user.entity";
import { Repository } from "typeorm";
import { SignupDto } from "./dto/sign.up.dto";
import { DateTimeHelper } from "src/common/utils/date.time.helper";

@Injectable()
export class LoginService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository : Repository<UserEntity>,
        private readonly jwtService : JwtService,
    ){}

    async signUp(dto:SignupDto):Promise<UserEntity>{
        try {
            const validating_existing_user = await this.userRepository.findOne({
                where:{email:dto.email,username:dto.useraname}
            })
            
            if(validating_existing_user){
                throw new ConflictException('user already exist with this name and email')
            }

            const newUser = new UserEntity()
            newUser.username = dto.useraname;
            newUser.email = dto.email;
            newUser.password = dto.password
            newUser.created_at = DateTimeHelper.getCurrentDateTime();
            newUser.updated_at = DateTimeHelper.getCurrentDateTime();

            return await this.userRepository.save(newUser)

        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}