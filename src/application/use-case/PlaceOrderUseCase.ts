import Decimal from "decimal.js";
import { DateTime } from "luxon";
import AppliedCoupon from "../../domain/entity/AppliedCoupon";
import Coupon from "../../domain/entity/Coupon";
import Order from "../../domain/entity/Order"
import OrderCode from "../../domain/entity/OrderCode";
import OrderItem from "../../domain/entity/OrderItem";
import { WarehouseItemId } from "../../domain/entity/WarehouseItem"
import AppliedCouponRepository from "../../domain/repository/AppliedCouponRepository";
import CouponRepository from "../../domain/repository/CouponRepository";
import OrderRepository from "../../domain/repository/OrderRepository"
import WarehouseItemRepository from "../../domain/repository/WarehouseItemRepository";

export default class PlaceOrderUseCase {

    constructor(
        private orderRepository: OrderRepository,
        private warehouseItemRepository: WarehouseItemRepository,
        private couponRepository: CouponRepository,
        private appliedCouponRepository: AppliedCouponRepository
    ) {
        this.orderRepository = orderRepository
        this.warehouseItemRepository = warehouseItemRepository
        this.appliedCouponRepository = appliedCouponRepository
        this.couponRepository = couponRepository
    }
    // NOTE This approach of defining the sequentialId only works for a single-threaded system. If there
    //  are multiple application that can place orders, then there will be collision.
    public async execute({ cpf, items, coupon: couponName }: Input): Promise<any> {
        const orderItems = await this.createOrderItems(items)
        const orderQuantity = await this.orderRepository.count()
        const creationTime = DateTime.now()
        const orderCode = new OrderCode(orderQuantity + 1, creationTime.year)
        const order = new Order(orderCode, creationTime, cpf, orderItems)
        await this.orderRepository.save(order)
        if (couponName) await this.applyCoupon(order, couponName)
        return orderCode
    }

    private async applyCoupon(order: Order, couponName: string): Promise<any> {
        const coupon = await this.couponRepository.getOne(couponName)
        const appliedCoupon = new AppliedCoupon(coupon, order)
        await this.appliedCouponRepository.insert(appliedCoupon)
    }

    private async createOrderItems(inputItems: InputItem[]): Promise<OrderItem[]> {
        const result: OrderItem[] = []
        for (let inputItem of inputItems) {
            const warehouseItem = await this.warehouseItemRepository.findOne(inputItem.warehouseItemId)
            if (!warehouseItem) throw 'Warehouse item does not exist'
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

