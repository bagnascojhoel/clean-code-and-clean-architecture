import Decimal from "decimal.js";
import { DateTime } from "luxon";
import Order from "../../domain/entity/Order"
import OrderCode from "../../domain/entity/OrderCode";
import OrderItem from "../../domain/entity/OrderItem";
import WarehouseItem, { WarehouseItemId } from "../../domain/entity/WarehouseItem"
import OrderRepository from "../../domain/repository/OrderRepository"
import WarehouseItemRepository from "../../domain/repository/WarehouseItemRepository";

export default class PlaceOrderUseCase {

    constructor(
        private orderRepository: OrderRepository,
        private warehouseItemRepository: WarehouseItemRepository
    ) {
        this.orderRepository = orderRepository
        this.warehouseItemRepository = warehouseItemRepository
    }

    public async execute({ cpf, items, coupon }: Input): Promise<any> {
        const orderItems: OrderItem[] = []
        for (let item of items) {
            orderItems.push(await this.createOrderItem(item))
        }
        const order = new Order(new OrderCode(1, 2022), DateTime.now(), cpf, orderItems);
        const orderCode = await this.orderRepository.save(order);
        // insert coupon
    }

    private async createOrderItem({ quantity, warehouseItemId }: InputItem): Promise<OrderItem> {
        const warehouseItem = await this.warehouseItemRepository.findOne(warehouseItemId)
        return new OrderItem(warehouseItem, warehouseItem.price, quantity)
    }

}

type InputItem = {
    warehouseItemId: WarehouseItemId
    quantity: number
}

type Input = {
    cpf: string,
    items: InputItem[],
    coupon?: string,
}

