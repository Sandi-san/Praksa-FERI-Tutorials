import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Order } from 'entities/order.entity'
import { Response } from 'express'
import { Parser } from 'json2csv'
import { AbstractService } from 'modules/common/abstract.service'
import { Repository } from 'typeorm'

@Injectable()
export class OrdersService extends AbstractService {
  constructor(@InjectRepository(Order) private readonly ordersRepository: Repository<Order>) {
    super(ordersRepository)
  }

  //export Orders from json to csv
  async export(response: Response): Promise<any> {
    const parser = new Parser({
      fields: ['ID', 'Name', 'Email', 'Product title', 'Price', 'Quantity'],
    })

    const json = []
    //POZOR: order_items isto ime kot v entity
    const orders: Order[] = await this.findAll(['order_items'])

    orders.forEach((o) => {
      //za vsak order
      json.push({
        ID: o.id,
        Name: o.name,
        Email: o.email,
        'Product title': '',
        Price: '',
        Quantity: '',
      })
      //za vsak orderItem v orderju
      o.order_items.forEach((oi) => {
        json.push({
          ID: '',
          Name: '',
          Email: '',
          'Product title': oi.product_title,
          Price: oi.price,
          Quantity: oi.quantity,
        })
      })
    })

    const csv = parser.parse(json)
    response.setHeader('Content-Type', 'text/csv')
    response.attachment('orders.csv')
    response.send(csv)
  }

  async chart(): Promise<{ date: string; sum: string }[]> {
    const apiData = await this.ordersRepository.query(`
            SELECT to_date(cast(o.created_at as TEXT), '%Y-%m-%d') as date, sum(oi.price * oi.quantity) as sum
            FROM "order" o JOIN "order_item" oi ON o.id = oi.order_id
            GROUP BY date;
        `)
    //filtriraj samo Date in ne Time iz postgres responsa
    const chartData: { date: string; sum: string }[] = []
    for (let index = 0; index < apiData.length; index++) {
      chartData.push({
        date: (apiData[index].date as Date).toISOString().split('T')[0],
        sum: apiData[index].sum,
      })
      return chartData
    }
  }
}
