import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';

@Injectable()
export class UserService {
    //za GET(id)
    findOne(id: string) {
        return ({
            id: id
        })
    }
    //za POST
    create(createUserDto: CreateUserDto){
        return "User created successfully!"
    }
}
