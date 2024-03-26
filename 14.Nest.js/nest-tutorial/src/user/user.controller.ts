import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { CommentService } from 'src/comment/comment.service';

//vsak url se bo zacel z /user/
@Controller('user')
export class UserController {
    //ustvari instanco UserService, za uporabo pri GET requestu
    constructor(private readonly userService: UserService, private readonly commentService: CommentService) {}

    //GET request, ki pozene findAll funkcijo
    //ce prazen, potem GET sprozi na /user
    //ce dodamo string, potem sprozi na npr. /user/all
    @Get("all")
    findAll(){
        return "all users";
    }

    //GET request z parametri
    @Get(":id")
    findOne(@Param("id") id:string){
        //uporaba z UserService
        return this.userService.findOne(id)
    }

    /*
    //POST request
    @Post()
    //@Body-body ki poslemo v POST requestu
    // create(@Body() body:any){
    //ce zelimo dostopati le do dolocenega elementa
    create(@Body("name") name:string){
        return "user name is "+name
    }
    */

    //POST request z DTO
    @Post()
    //@Body-body ki poslemo v POST requestu
    // create(@Body() body:any){
    //ce zelimo dostopati le do dolocenega elementa
    createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.create(createUserDto)
    }

    //GET za commente
    @Get(":id/comments")
    getUserComments(@Param("id") id:string){
        return this.commentService.findUserComments(id)
    }
}
