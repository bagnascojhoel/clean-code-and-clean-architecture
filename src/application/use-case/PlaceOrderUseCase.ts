import { DateTime } from "luxon";
import AppliedCoupon from "../../domain/entity/AppliedCoupon";
import Cpf from "../../domain/entity/Cpf";
import Order from "../../domain/entity/order/Order";
import OrderCode from "../../domain/entity/order/OrderCode";
import OrderItem from "../../domain/entity/order/OrderItem";
import { WarehouseItemId } from "../../domain/entity/warehouse/WarehouseItem";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import AppliedCouponRepository from "../../domain/repository/AppliedCouponRepository";
import CouponRepository from "../../domain/repository/CouponRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import WarehouseItemRepository from "../../domain/repository/WarehouseItemRepository";

export default class PlaceOrderUseCase {
    private readonly orderRepository: OrderRepository
    private readonly warehouseItemRepository: WarehouseItemRepository
    private readonly appliedCouponRepository: AppliedCouponRepository
    private readonly couponRepository: CouponRepository

    constructor(private readonly repositoryFactory: RepositoryFactory) {
        this.orderRepository = repositoryFactory.createForOrder()
        this.warehouseItemRepository = repositoryFactory.createForWarehouseItem()
        this.appliedCouponRepository = repositoryFactory.createAppliedCoupon()
        this.couponRepository = repositoryFactory.createCoupon()
    }
    // NOTE This approach of defining the sequentialId only works for a single-threaded system. If there
    //  are multiple application that can place orders, then there will be collision.
    public async execute({ cpf, items, coupon: couponName }: PlaceOrderInput): Promise<any> {
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
        if (!coupon) throw 'Coupon does not exist'
        const appliedCoupon = new AppliedCoupon(coupon, order)
        await this.appliedCouponRepository.insert(appliedCoupon)
    }

    private async createOrderItems(inputItems: PlaceOrderInputItem[]): Promise<OrderItem[]> {
        const warehouseItemsIds = inputItems.reduce((acc: WarehouseItemId[], i) => (acc.push(i.warehouseItemId), acc), [])
        const allWarehouseItemsExist = await this.warehouseItemRepository.exists(warehouseItemsIds)
        if (!allWarehouseItemsExist) throw 'At least one item of the order does not exist'
        return inputItems.map(i => new OrderItem(i.warehouseItemId, i.quantity))
    }

}

export type PlaceOrderInputItem = {
    warehouseItemId: WarehouseItemId
    quantity: number
}

export type PlaceOrderInput = {
    cpf: string | Cpf,
    items: PlaceOrderInputItem[],
    coupon?: string,
}

