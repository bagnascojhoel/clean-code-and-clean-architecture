import Decimal from "decimal.js";
import Address from "./Address";
import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Freight from "./Freight";
import OrderItem from "./OrderItem";

const DEFAULT_ORIGIN = new Address();

export default class Order {
    readonly cpf: Cpf;
    private items: OrderItem[];
    private coupon?: Coupon;
    private freight?: Freight;

    constructor(cpf: string, destination: Address, items: OrderItem[], coupon?: Coupon) {
        if (items.length === 0) throw new Error('Order must have at least one item')
        this.cpf = new Cpf(cpf);
        this.freight = new Freight(DEFAULT_ORIGIN, destination, items);
        this.items = items;
        this.coupon = coupon;
    }

    public get totalPrice(): Decimal {
        const total = this.items.reduce((acc: number, item: OrderItem) => {
            return acc + item.totalPrice;
        }, 0);
        const result = this.coupon ? this.coupon.applyDiscount(total) : total;
        return new Decimal(result);
    }

    public get freightPrice(): Decimal {
        return new Decimal(1);
    }

}
