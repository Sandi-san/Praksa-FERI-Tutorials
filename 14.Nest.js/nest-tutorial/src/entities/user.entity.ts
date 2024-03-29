import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import * as bcrypt from 'bcrypt'
import { Comment } from "./comment.entity";

//tabela v DB za model User
@Entity("users")
export class User {
    //PRIMARY KEY
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    //DB TRIGGERS - HASH za PASSWORD
    //izvede vedno ko insertamo password v DB
    //potrebuje: npm i bcrypt
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }


    //RELATIONSHIP: User - Comment
    //en user - vec commentu
    @OneToMany((type) => Comment, (comment) => comment.user)
    comments: Comment[]
}