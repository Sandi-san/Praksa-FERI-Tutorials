import { Exclude, Expose } from 'class-transformer'
import { Column, Entity, OneToMany } from 'typeorm'

import { Base } from './base.entity'
import { OrderItem } from './order-item.entity'

@Entity()
export class Order extends Base {
  @Column()
  @Exclude()
  first_name: string

  @Column()
  @Exclude()
  last_name: string

  @Column()
  email: string

  //POZOR: order pri orderItem.order
  //En Order ima vec OrderItemov
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  order_items: OrderItem[]

  //funkcija, zdruzi first_name in last_name v fullname
  @Expose() //da se vidi izven classa
  get name(): string {
    return `${this.first_name} ${this.last_name}`
  }

  //dobi total price v Orderju
  @Expose()
  get total(): number {
    return this.order_items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  }
}
