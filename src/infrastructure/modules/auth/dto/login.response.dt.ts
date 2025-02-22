import { UserEntity } from "src/infrastructure/models/user/user.entity";

export class loginResponseDTO extends UserEntity{
    token:string
}