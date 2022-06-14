import Decimal from "decimal.js";
import { DateTime } from "luxon";
import Order from "../../domain/entity/Order"
import OrderCode from "../../domain/entity/OrderCode";
import OrderItem from "../../domain/entity/OrderItem";
import WarehouseItem, { WarehouseItemId } from "../../domain/entity/WarehouseItem"
import CouponRepository from "../../domain/repository/CouponRepository";
import OrderRepository from "../../domain/repository/OrderRepository"
import WarehouseItemRepository from "../../domain/repository/WarehouseItemRepository";

export default class PlaceOrderUseCase {

    constructor(
        private orderRepository: OrderRepository,
        private warehouseItemRepository: WarehouseItemRepository,
        private couponRepository: CouponRepository
    ) {
        this.orderRepository = orderRepository
        this.warehouseItemRepository = warehouseItemRepository
    }
    // TODO This approach of defining the sequentialId only works for a single-threaded system. If there
    //  are multiple application that can place orders, then there will be collision.
    public async execute({ cpf, items, coupon }: Input): Promise<any> {
        const orderItems = await this.createOrderItems(items)
        const orderQuantity = await this.orderRepository.count()
        const creationTime = DateTime.now()
        const orderCode = new OrderCode(orderQuantity + 1, creationTime.year)
        const order = new Order(orderCode, creationTime, cpf, orderItems);
        await this.orderRepository.save(order);
        // insert coupon

        return orderCode
    }

    private async createOrderItems(inputItems: InputItem[]): Promise<OrderItem[]> {
        const result: OrderItem[] = []
        for (let inputItem of inputItems) {
            const warehouseItem = await this.warehouseItemRepository.findOne(inputItem.warehouseItemId)
            const item = new OrderItem(warehouseItem, warehouseItem.price, inputItem.quantity)
            result.push(item)
        }
        return result
    }

}

export type InputItem = {
    warehouseItemId: WarehouseItemId
    quantity: number
}

export type Input = {
    cpf: string,
    items: InputItem[],
    coupon?: string,
}

