import Order from "../entity/order/Order";
import OrderItem from "../entity/order/OrderItem";
import DomainEvent from "./DomainEvent";

export default class OrderCancelledEvent extends DomainEvent {
    readonly orderItems: OrderItem[]
    constructor(order: Order) {
        super("order-cancelled")
        this.orderItems = order.items
    }
}
