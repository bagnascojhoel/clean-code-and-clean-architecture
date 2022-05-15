import Address from "./Address";
import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Freight from "./Freight";
import OrderItem from "./OrderItem";

export default class Order {
    readonly cpf: Cpf;
    readonly destination: Address;
    private items: OrderItem[];
    private coupon?: Coupon;

    constructor(cpf: string, destination: Address, items: OrderItem[], coupon?: Coupon) {
        if (items.length === 0) throw new Error('Order must have at least one item')
        this.cpf = new Cpf(cpf);
        this.destination = destination;
        this.items = items;
        this.coupon = coupon;
    }

    public get price() {
        const total = this.items.reduce((acc: number, item: OrderItem) => {
            return acc + item.totalPrice;
        }, 0);
        return this.coupon ? this.coupon.applyDiscount(total) : total;
    }

}
