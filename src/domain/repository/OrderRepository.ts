import Order from "../entity/Order";
import OrderCode from "../entity/OrderCode";

export default interface OrderRepository {
    save(order: Order): Promise<OrderCode>
    findOne(code: OrderCode): Promise<Order | null>
    findAll(): Promise<Order[]>
    count(): Promise<number>
}
