import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Topic } from "./topic.entity";

@Entity()
export class Comment{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    test:string

    //FOREIGN KEYS
    //vec comments -> one user
    @ManyToOne(type=>User, user=>user.comments)
    user:User

    //vec comments -> one topic
    @ManyToOne((type)=>Topic, (topic)=>topic.comments)
    topic:Topic
}