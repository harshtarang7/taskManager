import { Body, Controller, Post } from "@nestjs/common";
import { LoginService } from "./login.service";
import { SignupDto } from "./dto/sign.up.dto";
import { UserEntity } from "src/infrastructure/models/user/user.entity";
import { LoginDto } from "./dto/login.dto";
import { loginResponseDTO } from "./dto/login.response.dt";

@Controller('admin-login')
export class LoginController{
    constructor(
        private readonly loginService:LoginService
    ){}

    @Post("/sign-up")
    async signUp(@Body() dto:SignupDto):Promise<UserEntity>{
        try {
            const userSignUp = await this.loginService.signUp(dto)
            
            return userSignUp;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    @Post("/login")
    async login(@Body() dto:LoginDto):Promise<loginResponseDTO>{
        try {
            const user = await this.loginService.login(dto)
            return user;

        } catch (error) {
            throw error;
        }
    }
}