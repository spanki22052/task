import { Type } from 'class-transformer'

export type OrdersFilter = {
  page?: number
  limit?: 20 | 50 | 100 | 250
  filter?: {
    numbers?: string[]
    ids?: number[]
    extendedStatus?: string[]
    deliveryTypes?: string[]
    createdAtFrom?: string
    createdAtTo?: string
  }
}

export class CrmType {
  name: string
  code: string
}

export type OrderItemProperty = {
  code: string
  name: string
  value: string
}

export class OrderItemOffer {
  externalId: string
  displayName: string
  article: string
  unit: {
    code: string
    name: string
    sym: string
  }
  properties: {
    [key: string]: {
      value: string
      code: string
    }
  }
}

export class OrderItem {
  id: number
  status: string
  quantity: number
  @Type(() => OrderItemOffer)
  offer: OrderItemOffer
  comment: string
}

export class OrderDelivery {
  code?: string
}

export type RetailPagination = {
  limit: 20 | 50 | 100 | 250
  totalCount: number
  currentPage: number
  totalPageCount: number
}
export class Order {
  id: string
  number: string
  createdAt: string
  status: string
  customer: any
  firstName: string
  statusComment: string
  customerComment: string
  @Type(() => OrderDelivery)
  delivery: OrderDelivery
  @Type(() => OrderItem)
  items: OrderItem[]
  offer: any
  site: string
  orderType: string
  statusUpdatedAt: string
}

export type OrdersReturn = {
  orders: Order[]
  pagination: RetailPagination
}
