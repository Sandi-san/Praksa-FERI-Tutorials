import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
    //nastavi dostop do route: users/me z UseGuards
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@Req() req:Request){
        //dobi info userja glede trenutni access token
        return req.user
    }
}
