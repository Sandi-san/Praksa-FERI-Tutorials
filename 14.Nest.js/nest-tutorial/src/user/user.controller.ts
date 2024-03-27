import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { CommentService } from 'src/comment/comment.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

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
    findOne(@Param("id") id:number){
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

    //z JWT metodo: vrne unautherized, ce nimamo access tokena v header-ju (npr. Postman header)
    @UseGuards(JwtGuard)
    //GET za commente
    @Get(":id/comments")
    getUserComments(@Param("id") id:string){
        return this.commentService.findUserComments(id)
    }

    //PUT za update
    @Put(":id")
    update(@Param("id") id:number,@Body() updateUserDto:UpdateUserDto){
        return this.userService.update(id,updateUserDto)
    }
}
