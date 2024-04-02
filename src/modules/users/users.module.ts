import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'entities/user.entity'

@Module({
  //da lahko kreiras v DB (z Post)
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  //uporaba drugje
  exports: [UsersService],
})
export class UsersModule {}
