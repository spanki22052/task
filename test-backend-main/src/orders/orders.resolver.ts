import { Args, Query, Resolver } from '@nestjs/graphql'
import { RetailService } from '../retail_api/retail.service'
import { OrdersResponse } from '../graphql'
import { Order, OrdersReturn } from 'src/retail_api/types'

@Resolver('Orders')
export class OrdersResolver {
  constructor(private retailService: RetailService) {}

  @Query()
  async order(@Args('number') id: string): Promise<Order> {
    return await this.retailService.findOrder(id)
  }

  @Query()
  async getOrders(@Args('page') page: number): Promise<OrdersReturn> {
    return await this.retailService.getOrders(page)
  }
}
