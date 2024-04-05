import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { Base } from './base.entity'
import { Order } from './order.entity'

@Entity()
export class OrderItem extends Base {
  @Column()
  product_title: string

  @Column()
  price: number

  @Column()
  quantity: number

  //En orderItem v enem Orderju
  @ManyToOne(() => Order, (order) => order.order_items)
  //tuji kljuc
  @JoinColumn({ name: 'order_id' })
  order: Order
}
