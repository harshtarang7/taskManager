import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/infrastructure/models/user/user.entity";
import { Repository } from "typeorm";
import { SignupDto } from "./dto/sign.up.dto";
import { DateTimeHelper } from "src/common/utils/date.time.helper";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto";
import { loginResponseDTO } from "./dto/login.response.dt";
import { AuthService } from "../jwt/jwt.service";

@Injectable()
export class LoginService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository : Repository<UserEntity>,
        private readonly jwtService : AuthService,
    ){}

    async signUp(dto:SignupDto):Promise<UserEntity>{
        try {
            const validating_existing_user = await this.userRepository.findOne({
                where:{email:dto.email,username:dto.username}
            })
            
            if(validating_existing_user){
                throw new ConflictException('user already exist with this name and email')
            }

            const newUser = new UserEntity()
            newUser.username = dto.username;
            newUser.email = dto.email;
            newUser.password = await bcrypt.hash(dto.password, 10);

            const savedUser = await this.userRepository.save(newUser);

            return savedUser;

        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async login(dto:LoginDto):Promise<loginResponseDTO>{
        try {
            const find_user = await this.userRepository.findOne({
                where:{email:dto.email}
            })
            
            if (!find_user) {
                throw new NotFoundException("No user found with this email");
            }

            const isPasswordValid = await bcrypt.compare(dto.password, find_user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException("Invalid password");
            }

            const token = await this.jwtService.generateToken(find_user)
        
            return { ...find_user, token: token.access_token };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}