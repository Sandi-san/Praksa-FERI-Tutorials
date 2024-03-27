import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class RefreshJwtStrategy extends PassportStrategy(Strategy,"jwt-refresh")
{
    constructor(){
        super({
            //v refreshToken API mora biti refresh property v body-u
                jwtFromRequest:ExtractJwt.fromBodyField("refresh"),
                ignoreExpiration:false,
                secretOrKey:`${process.env.jwt_secret}`
        })
    }

    async validate(payload:any){
        return {
            //payload iz auth.service.ts
            user:payload.sub,
            username:payload.username
        }
    }
}