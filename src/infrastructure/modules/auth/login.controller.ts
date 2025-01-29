import { Controller, Post } from "@nestjs/common";
import { LoginService } from "./login.service";
import { SignupDto } from "./dto/sign.up.dto";
import { UserEntity } from "src/infrastructure/models/user/user.entity";

@Controller('admin-login')
export class LoginController{
    constructor(
        private readonly loginService:LoginService
    ){}

    @Post("/sign-up")
    async signUp(dto:SignupDto):Promise<UserEntity>{
        try {
            const userSignUp = await this.loginService.signUp(dto)
            
            return userSignUp;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}