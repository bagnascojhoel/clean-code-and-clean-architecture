import Decimal from "decimal.js";
import { DateTime } from "luxon";
import Order from "../../domain/entity/Order"
import OrderItem from "../../domain/entity/OrderItem";
import WarehouseItem, { WarehouseItemId } from "../../domain/entity/WarehouseItem"
import OrderRepository from "../../domain/repository/OrderRepository"

export default class PlaceOrderUseCase {
    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    async execute(input: Input): Promise<any> {

        const order = new Order(DateTime.now(), '01060840030', []);
        return await this.orderRepository.insert(order);
    }

}

type Input = {
    cpf: string,
    items: {
        warehouseItemId: WarehouseItemId,
        quantity: Decimal
    }[],
    coupon?: string,
}

