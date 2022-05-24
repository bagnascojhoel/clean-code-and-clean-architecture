import Decimal from "decimal.js";
import { DateTime } from "luxon";
import Prototype from "../Prototype";
import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Freight from "./Freight";
import OrderItem from "./OrderItem";

const CODE_LENGTH = 8;

export default class Order implements Prototype<Order> {
    readonly sequentialId: number;
    readonly code: string;
    readonly cpf: Cpf;
    readonly createdAt: DateTime;
    private items: OrderItem[];

    constructor(sequentialId: number, createdAt: DateTime, cpf: string, items: OrderItem[]) {
        if (items.length === 0) throw new Error('Order must have at least one item')
        this.sequentialId = sequentialId;
        this.cpf = new Cpf(cpf);
        this.createdAt = createdAt;
        this.items = items;
        this.code = this.generateDomainCode();
    }

    cloneDeep(payload?: any): Order {
        const id = payload?.id ?? this.sequentialId;
        const createdAt = payload?.createdAt ?? this.createdAt;
        const cpf = payload?.cpf ?? this.cpf.value;
        const items = payload?.items ?? this.items.map(item => item.cloneDeep());
        return new Order(id, createdAt, cpf, items)
    }

    calculateTotalPrice(freight: Freight, coupon?: Coupon): Decimal {
        const itemsTotal = this.items.reduce<Decimal>((acc, item) => acc.plus(item.totalPrice), new Decimal(0))
        const couponDiscount = coupon?.calculateDiscount(this.createdAt, itemsTotal) ?? new Decimal(0)
        return itemsTotal
            .sub(couponDiscount)
            .plus(freight.calculatePrice());
    }

    private generateDomainCode(): string {
        const paddedId = new Decimal(this.sequentialId).toString().padStart(CODE_LENGTH, '0');
        return `${this.createdAt.toFormat('yyyy')}${paddedId}`;
    }

}
