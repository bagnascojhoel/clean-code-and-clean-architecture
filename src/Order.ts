import Decimal from "decimal.js";
import { DateTime } from "luxon";
import Address from "./Address";
import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Freight from "./Freight";
import OrderItem from "./OrderItem";

export default class Order {
    readonly cpf: Cpf;
    readonly createdAt: DateTime;
    private items: OrderItem[];
    private coupon?: Coupon;
    private freight: Freight;

    constructor(createdAt: DateTime, cpf: string, freight: Freight, items: OrderItem[], coupon?: Coupon) {
        if (items.length === 0) throw new Error('Order must have at least one item')
        this.cpf = new Cpf(cpf);
        this.createdAt = createdAt;
        this.freight = freight;
        this.items = items;
        this.coupon = coupon;
    }

    calculateTotalPrice(): Decimal {
        const itemsTotal = this.items.reduce<Decimal>((acc, item) => acc.plus(item.totalPrice), new Decimal(0))
        const couponDiscount = this.coupon?.calculateDiscount(this.createdAt, itemsTotal) ?? new Decimal(0)
        return itemsTotal
            .sub(couponDiscount)
            .plus(this.freight.calculatePrice());
    }

}
