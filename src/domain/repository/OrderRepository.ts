import Order from "../entity/Order";

export default interface OrderRepository {
    insert(order: Order): Promise<number>
}
