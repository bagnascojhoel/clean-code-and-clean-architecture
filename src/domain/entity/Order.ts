import Decimal from "decimal.js";
import { DateTime } from "luxon";
import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Freight from "./Freight";
import OrderCode from "./OrderCode";
import OrderItem from "./OrderItem";

export default class Order {
    readonly cpf: Cpf;

    constructor(
        readonly code: OrderCode,
        readonly createdAt: DateTime,
        cpf: string,
        readonly items: OrderItem[]
    ) {
        if (items.length === 0) throw new Error('Order must have at least one item')
        if (this.containsDuplicatedItems(items)) throw new Error('There shouldn\'t be more than one item of the same product')
        this.code = code
        this.cpf = new Cpf(cpf);
        this.createdAt = createdAt;
        this.items = items;
    }

    public calculateTotalPrice(freight: Freight, coupon?: Coupon): Decimal {
        const itemsTotal = this.items.reduce<Decimal>((acc, item) => acc.plus(item.totalPrice), new Decimal(0))
        const couponDiscount = coupon?.calculateDiscount(this.createdAt, itemsTotal) ?? new Decimal(0)
        return itemsTotal
            .sub(couponDiscount)
            .plus(freight.calculatePrice());
    }

    private containsDuplicatedItems(orderItems: OrderItem[]): boolean {
        const distinct = new Set()
        for (const v of orderItems)
            if (distinct.has(v.warehouseItemId)) return true
            else distinct.add(v.warehouseItemId)
        return false
    }
}
