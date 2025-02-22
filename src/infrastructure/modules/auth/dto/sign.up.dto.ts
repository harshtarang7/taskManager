import { IsString, MinLength } from "class-validator";

export class SignupDto {
    @IsString()
    email: string;
  
    @IsString()
    username: string;

    @IsString()
    @MinLength(6)
    password: string;
  }