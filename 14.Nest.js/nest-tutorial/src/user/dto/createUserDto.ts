import { IsEmail, IsNumberString, IsString } from "class-validator"

//v DTO definiramo body objekta
export class CreateUserDto{
    //za validacijo treba installat class-validator in class-transformer (npm i --save class-validator class-transformer)
    //Pozor: treba dodati v main.ts
    @IsString()
    name: string
    @IsEmail()
    email: string
    @IsNumberString()
    phone:string
}