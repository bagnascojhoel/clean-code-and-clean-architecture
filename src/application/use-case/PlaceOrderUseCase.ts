import { DateTime } from "luxon";
import Order from "../../domain/entity/Order"
import OrderItem from "../../domain/entity/OrderItem";
import WarehouseItem from "../../domain/entity/WarehouseItem"
import OrderRepository from "../../domain/repository/OrderRepository"

export default class PlaceOrderUseCase {
    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    async execute(input: Input): Promise<any> {

        const order = new Order(1, DateTime.now(), '01060840030', []);
        return await this.orderRepository.insert(order);
    }

}

type Input = {
    cpf: string,
    items: {
        warehouseItem: WarehouseItem,
        quantity: number
    }[],
    coupon?: string,
}

