//PROVIDERS - dejanska logika (npr. povezava z DB)

import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
//hashanje passwordov (izboljsava bcrypt)
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService) { }

    //ustvari user-ja
    async signup(dto: AuthDto) {
        try {
            //generiraj password
            const hash = await argon.hash(dto.password)
            //shrani user v DB
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash
                }
            })
            //odstrani hash iz user objekta predenj ga vrnes
            // delete user.hash
            //vrni novega userja
            // return user
            return this.signToken(user.id, user.email)

        } catch (error) {
            //ce email novega userja ni unique, vrni prirejen error msg
            if (error instanceof PrismaClientKnownRequestError) {
                //duplicate field
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }
            }
        }
    }
    async signin(dto: AuthDto) {
        //find user
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        //exception ce ni userja
        if (!user)
            throw new ForbiddenException('Credentials incorrect')
        //compare hash password
        const pwMatches = await argon.verify(user.hash, dto.password)

        if (!pwMatches)
            throw new ForbiddenException('Credentials incorrect')
        //vrni user
        // delete user.hash
        // return user
        return this.signToken(user.id, user.email)
    }

    async signToken(userId: number, email: string):
        Promise<{access_token: string}> {
        const payload = {
            sub: userId,
            email
        }

        //ce hocemo returnat objekt
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: this.config.get('JWT_SECRET')
        })
        return {
            access_token:token
        }
    }
}