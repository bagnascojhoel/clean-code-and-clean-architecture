import Decimal from "decimal.js";
import { DateTime } from "luxon";
import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Freight from "./Freight";
import OrderItem from "./OrderItem";

const CODE_LENGTH = 8;

export default class Order {
    readonly id: number;
    readonly code: string;
    readonly cpf: Cpf;
    readonly createdAt: DateTime;
    private items: OrderItem[];
    private coupon?: Coupon;
    private freight: Freight;

    constructor(id: number, createdAt: DateTime, cpf: string, freight: Freight, items: OrderItem[], coupon?: Coupon) {
        if (items.length === 0) throw new Error('Order must have at least one item')
        this.id = id;
        this.cpf = new Cpf(cpf);
        this.createdAt = createdAt;
        this.freight = freight;
        this.items = items;
        this.coupon = coupon;
        this.code = this.generateDomainCode();
    }

    calculateTotalPrice(): Decimal {
        const itemsTotal = this.items.reduce<Decimal>((acc, item) => acc.plus(item.totalPrice), new Decimal(0))
        const couponDiscount = this.coupon?.calculateDiscount(this.createdAt, itemsTotal) ?? new Decimal(0)
        return itemsTotal
            .sub(couponDiscount)
            .plus(this.freight.calculatePrice());
    }

    private generateDomainCode(): string {
        const paddedId = new Decimal(this.id).toString().padStart(CODE_LENGTH, '0');
        return `${this.createdAt.toFormat('yyyy')}${paddedId}`;
    }

}
