import Coupon from "./Coupon";
import Cpf from "./Cpf";
import OrderItem from "./OrderItem";

export default class Order {
    readonly cpf: Cpf;
    private items: OrderItem[];
    private coupon?: Coupon;

    constructor(cpf: string, items: OrderItem[], coupon?: Coupon) {
        this.cpf = new Cpf(cpf);
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
