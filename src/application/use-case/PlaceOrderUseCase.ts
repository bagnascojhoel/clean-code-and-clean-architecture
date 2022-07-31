import { DateTime } from "luxon";
import AppliedCoupon from "../../domain/entity/AppliedCoupon";
import Cpf from "../../domain/entity/Cpf";
import Order from "../../domain/entity/Order";
import OrderCode from "../../domain/entity/OrderCode";
import OrderItem from "../../domain/entity/OrderItem";
import { WarehouseItemId } from "../../domain/entity/WarehouseItem";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import AppliedCouponRepository from "../../domain/repository/AppliedCouponRepository";
import CouponRepository from "../../domain/repository/CouponRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import WarehouseItemRepository from "../../domain/repository/WarehouseItemRepository";
// TODO Use presenters
export default class PlaceOrderUseCase {
    private readonly orderRepository: OrderRepository
    private readonly warehouseItemRepository: WarehouseItemRepository
    private readonly appliedCouponRepository: AppliedCouponRepository
    private readonly couponRepository: CouponRepository

    constructor(private readonly repositoryFactory: RepositoryFactory) {
        this.orderRepository = repositoryFactory.createOrderRepository()
        this.warehouseItemRepository = repositoryFactory.createWarehouseItemRepository()
        this.appliedCouponRepository = repositoryFactory.createAppliedCouponRepository()
        this.couponRepository = repositoryFactory.createCouponRepository()
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
        const result: OrderItem[] = []
        for (let inputItem of inputItems) {
            // JODO Remove the necessity of fetching warehouse items to fill orderItem.price.
            //  Instead, define a flow of warehouseItem price change.
            const warehouseItem = await this.warehouseItemRepository.findOne(inputItem.warehouseItemId)
            if (!warehouseItem) throw 'Warehouse item does not exist'
            const item = new OrderItem(warehouseItem.id, warehouseItem.price, inputItem.quantity)
            result.push(item)
        }
        return result
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

