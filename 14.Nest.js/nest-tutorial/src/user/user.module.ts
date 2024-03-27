import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CommentService } from 'src/comment/comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  //dostop do repozitorijev (glej user.controller constructor)
  //uporabimo za findOne v user.service
  imports:[TypeOrmModule.forFeature([User])],

  controllers: [UserController],
  providers: [UserService, CommentService]
})
export class UserModule {}
