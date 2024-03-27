import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    //uporabi/inject UserService (inject-povezava z strukturo DB baze)
    constructor(private readonly userService: UserService, private jwtService: JwtService) { }

    //preveri ce user ze obstaja v DB
    async validateUser(username: string, password: string) {
        const user = await this.userService.findOneWithUsername(username)

        //preveri ce User ni null in primerjaj password
        if (user && await bcrypt.compare(password, user.password)) {
            //vrni user objekt, brez password
            const { password, ...result } = user
            return result
        }
        return null
    }

    //potrebuje JWT authentication install
    async login(user: User) {
        //ustvari payload object
        const payload = {
            username: user.email,
            sub: {
                name: user.name
            }
        }
        //ustvari JWT access token in vrni user object
        return {
            ...user,
            accessToken: this.jwtService.sign(payload),
            //refreshToken (ko accessToken expirea, ampak user se vedno prijavljen)
            refreshToken: this.jwtService.sign(payload,{expiresIn:'7d'})
        }
    }

    //refreshToken API
    async refreshToken(user: User) {
        //ustvari payload object
        const payload = {
            username: user.email,
            sub: {
                name: user.name
            }
        }
        //vrni novo ustvarjen JWT access token
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }
}
