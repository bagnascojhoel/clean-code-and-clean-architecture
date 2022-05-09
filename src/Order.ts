import Coupon from "./Coupon";
import { Cpf } from "./Cpf";
import { OrderItem } from "./OrderItem";

export class Order {
    readonly cpf: Cpf;
    private items: OrderItem[];
    private coupon?: Coupon;

    constructor(cpf: string, items: OrderItem[], coupon?: Coupon) {
        this.cpf = new Cpf(cpf);
        this.items = items;
        this.coupon = coupon;
    }

    public get price() {
        const sum = this.items.reduce((acc: number, item: OrderItem) => {
            return acc + item.totalPrice;
        }, 0);
        return sum - (sum * (this.coupon?.discountPercentage ?? 0));
    }

}
