import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetUser } from '../../src/auth/decorator';
import { JwtGuard } from '../../src/auth/guard';

//nastavi dostop do route: users/... z UseGuards
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    @Get('me')
    // getMe(@Req() req:Request){
    //z custom param decoratorjem
    getMe(@GetUser('') user: User) {
        //dobi info userja glede trenutni access token
        return user
        // return req.user
    }

    @Patch()
    editUser() { }
}
