import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity{
    @PrimaryGeneratedColumn({type:'int'})
    id:number;

    @Column({type:'varchar',name:'username',nullable:false})
    username:string;

    @Column({type:'varchar',name:'email',nullable:false})
    email:string;

    @Column({type:'varchar',name:'password',nullable:false})
    password:string;

    @Column({type:'date',name:'created_at',nullable:false})
    created_at:string;
   
    @Column({type:'date',name:'created_at',nullable:false})
    updated_at:string;

}
