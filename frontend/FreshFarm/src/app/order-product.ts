import { Order } from "./order"
import { Product } from "./product"

export interface OrderProduct {


    id?: string
    order?:Order
    product?:Product
    quantity?:Number
    createdAt?: Date
    


}
