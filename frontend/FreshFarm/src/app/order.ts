import { Product } from "./product"

export interface Order {

    _id?: string
    amount?:number
    productsOrdered?:any
    createdAt?: Date
    OrderedBy?:any
}
