//USER ENTITETA

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Exclude } from 'class-transformer'

import { Base } from './base.entity'
import { Role } from './role.entity'

@Entity()
export class User extends Base {
  @Column({ unique: true })
  email: string

  //optional
  @Column({ nullable: true })
  first_name: string

  @Column({ nullable: true })
  last_name: string

  @Column({ nullable: true })
  avatar: string

  @Column({ nullable: true })
  @Exclude() //field ne bo prikazovan
  password: string

  // @Column({ nullable: true, default: null })
  // @Exclude()
  // refresh_token: string

  @ManyToOne(() => Role, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'role_id' })
  role: Role | null
}
