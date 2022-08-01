import Order from "../entity/order/Order";
import OrderItem from "../entity/order/OrderItem";
import DomainEvent from "./DomainEvent";

export default class OrderPlacedEvent extends DomainEvent {
    readonly orderItems: OrderItem[]

    constructor(order: Order) {
        super('order-placed')
        this.orderItems = order.items
    }
}
