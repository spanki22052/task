import { Injectable } from '@nestjs/common'
import {
  CrmType,
  Order,
  OrdersFilter,
  OrdersReturn,
  RetailPagination,
} from './types'
import axios, { AxiosInstance } from 'axios'
import { ConcurrencyManager } from 'axios-concurrency'
import { serialize } from '../tools'
import { plainToClass } from 'class-transformer'

@Injectable()
export class RetailService {
  private readonly axios: AxiosInstance
  dbData: any

  constructor() {
    this.axios = axios.create({
      baseURL: `${process.env.RETAIL_URL}/api/v5/`,
      method: 'GET',
      timeout: 10000,
      headers: {},
    })

    this.axios.interceptors.request.use((config) => {
      return config
    })
    this.axios.interceptors.response.use(
      (r) => {
        return r
      },
      (r) => {
        console.log('Error:', r.response.data)
        return r
      },
    )
  }

  async orders(filter?: OrdersFilter): Promise<[Order[], RetailPagination]> {
    const params = serialize(filter, '')
    const resp = await this.axios.get(
      `/orders?apiKey=${process.env.RETAIL_KEY}&` + params,
    )

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const orders = plainToClass(Order, resp.data.orders as Array<any>)
    const pagination: RetailPagination = resp.data.pagination

    return [orders, pagination]
  }

  async returnOrdersList(): Promise<Order[]> {
    return await this.axios
      .get(`orders?apiKey=${process.env.RETAIL_KEY}`)
      .then((el) => el.data.orders)
  }

  async getOrders(page: number): Promise<OrdersReturn> {
    const ordersList = await this.orders({ page: page, limit: 20 })
    const result = ordersList[0].map((el) => {
      el['site'] = el.customer.site ? el.customer.site : ''
      el['delivery']['code'] =
        el.delivery.code === undefined ? 'delivered' : el.delivery.code
      return el
    })

    return { orders: result, pagination: ordersList[1] }
  }

  async findOrder(id: string): Promise<Order> {
    const ordersList = (await this.orders({ page: 1, limit: 100 }))[0]
    const filtering = ordersList.filter((el) => el.id.toString() === id)
    const result = filtering[0]
    result['site'] = result.customer.site ? result.customer.site : ''
    result['delivery']['code'] =
      result.delivery.code === undefined ? 'delivered' : result.delivery.code

    return result
  }

  async orderStatuses(): Promise<CrmType[]> {
    const ordersList = (await this.orders({ page: 1, limit: 100 }))[0]

    return ordersList.map((el) => {
      return { name: el.firstName, code: el.id.toString() }
    })
  }

  async productStatuses(): Promise<CrmType[]> {
    const ordersList = (await this.orders({ page: 1, limit: 100 }))[0]
    // ordersList.map(el => {return {name: el.items.offerх0.displayName, code: el.items.offer.unit.code}})

    const result = ordersList
      .map((orderEl) => orderEl.items)
      .reduce((a, b) => {
        a = [...a, ...b]
        return a
      }, [])
      .map((el) => {
        return { name: el.offer.displayName, code: el.offer.article }
      })

    return result
  }

  async deliveryTypes(): Promise<CrmType[]> {
    const ordersList = (await this.orders({ page: 1, limit: 100 }))[0]

    const result = ordersList.map((el) => {
      return {
        name: el.delivery.code ? el.delivery.code : 'delivered',
        code: el.id.toString(),
      }
    })

    return result
  }
}
