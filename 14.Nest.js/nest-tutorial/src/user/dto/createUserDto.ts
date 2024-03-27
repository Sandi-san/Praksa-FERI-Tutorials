import { PartialType } from "@nestjs/mapped-types"
import { IsEmail, IsString } from "class-validator"

//v DTO definiramo body objekta
export class CreateUserDto{
    //za validacijo treba installat class-validator in class-transformer (npm i --save class-validator class-transformer)
    //Pozor: treba dodati v main.ts
    @IsString()
    name: string
    @IsEmail()
    email: string
    @IsString()
    password:string
}
//ustvari UpdateUserDto, ki ima ISTE parametre kot CreateUserDto (izognes ponavljanju)
//PartialType-optional spremenljivke (dodaj z npm i @nestjs/mapped-types)
export class UpdateUserDto extends PartialType(CreateUserDto){}