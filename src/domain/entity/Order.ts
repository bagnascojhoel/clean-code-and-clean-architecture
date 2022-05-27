import Decimal from "decimal.js";
import { DateTime } from "luxon";
import Prototype from "../Prototype";
import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Freight from "./Freight";
import OrderItem from "./OrderItem";

const SEQUENTIAL_ID_CODE_SECTION_LENGTH = 8;

export default class Order {
    readonly cpf: Cpf;
    readonly createdAt: DateTime;
    readonly items: OrderItem[];

    constructor(createdAt: DateTime, cpf: string, items: OrderItem[]) {
        if (items.length === 0) throw new Error('Order must have at least one item')
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

    public generateCode(sequentialId: number): string {
        const paddedId = new Decimal(sequentialId).toString().padStart(SEQUENTIAL_ID_CODE_SECTION_LENGTH, '0');
        return `${this.createdAt.toFormat('yyyy')}${paddedId}`;
    }

}
