import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'entities/user.entity'
import Logging from 'library/Logging'
import { UsersService } from 'modules/users/users.service'
import { compareHash, hash } from 'utils/bcrypt'
import { RegisterUserDto } from './dto/register-user.dto'
import { Request } from 'express'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}
  async validateUser(email: string, password: string): Promise<User> {
    Logging.info('Validating user...')
    //find user by email, ce obstaja je validacija ok
    const user = await this.usersService.findBy({ email: email })
    if (!user) {
      throw new BadRequestException('Invalid credentials!')
    }
    //passwords do not match
    if (!(await compareHash(password, user.password))) {
      throw new BadRequestException('Passwords do not match!')
    }
    Logging.info('User is valid.')
    return user
  }
  //za register
  async register(registerUserDto: RegisterUserDto): Promise<User> {
    //hashiraj novi password
    const hashedPassword = await hash(registerUserDto.password)
    //shrani variable (+ hashedPassword)
    return this.usersService.create({
      role_id: null,
      ...registerUserDto,
      password: hashedPassword,
    })
  }

  //za login
  async generateJwt(user: User): Promise<string> {
    return this.jwtService.signAsync({ sub: user.id, name: user.email })
  }

  //za get current user
  async user(cookie: string): Promise<User> {
    const data = await this.jwtService.verifyAsync(cookie)
    return this.usersService.findById(data['id'])
  }

  async getUserId(request: Request): Promise<string> {
    const user = request.user as User
    return user.id
  }
}
