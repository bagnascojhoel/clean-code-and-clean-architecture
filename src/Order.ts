import Decimal from "decimal.js";
import Address from "./Address";
import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Freight from "./Freight";
import OrderItem from "./OrderItem";

export default class Order {
    readonly cpf: Cpf;
    private items: OrderItem[];
    private coupon?: Coupon;
    private freight: Freight;

    constructor(cpf: string, freight: Freight, items: OrderItem[], coupon?: Coupon) {
        if (items.length === 0) throw new Error('Order must have at least one item')
        this.cpf = new Cpf(cpf);
        this.freight = freight;
        this.items = items;
        this.coupon = coupon;
    }

    calculateTotalPrice(): Decimal {
        const total = this.items.reduce((acc: number, item: OrderItem) => {
            return acc + item.totalPrice;
        }, 0);
        const itemsTotal = new Decimal(this.coupon ? this.coupon.applyDiscount(total) : total);
        return itemsTotal.plus(this.freight.calculatePrice());
    }

}
