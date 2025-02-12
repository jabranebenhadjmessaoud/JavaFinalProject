import { OrderProduct } from "./order-product"
import { Product } from "./product"

export interface Order {

    id?: string
    amount?:number
    orderProducts?:OrderProduct[]
    createdAt?: Date
    OrderedBy?:any
}
