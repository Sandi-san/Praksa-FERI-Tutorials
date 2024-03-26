import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
    findUserComments(userId: string){
        return "Comments of the user"
    }
}
