import Order from "../entity/order/Order"
import OrderCode from "../entity/order/OrderCode"

export default interface OrderRepository {
    save(order: Order): Promise<OrderCode>
    saveCancellation(order: Order): Promise<void>
    findOne(code: OrderCode): Promise<Order | null>
    findAll(): Promise<Order[]>
    count(): Promise<number>
}
