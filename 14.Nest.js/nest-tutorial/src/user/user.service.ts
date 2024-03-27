import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    //odobi dostop do User repository v DB
    constructor(@InjectRepository(User) private readonly userRepo:Repository<User>){}

    //za GET(id)
    async findOne(id: number) {
        return await this.userRepo.findOne({where:{id:id}})
    }

    //za POST
    async create(createUserDto: CreateUserDto){
        //create User object
        const user = await this.userRepo.create(createUserDto)
        //shrani v DB
        return await this.userRepo.save(user)
    }

    //ZA UPDATE (UpdateUserDto je v CreateUserDto)
    async update(id:number, updateUserDto: UpdateUserDto){
        return await this.userRepo.update(id,updateUserDto)
    }
}
