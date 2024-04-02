//REQUESTS - le povezovanje

import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

//global prefix route (auth/)
@Controller('auth')
export class AuthController {
    //ustvari instanco AuthService
    constructor(private authService: AuthService) { }

    //endpointi za login() in signup()
    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto)
    }
    
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto)
    }
}