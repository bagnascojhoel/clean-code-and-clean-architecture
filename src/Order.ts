import { Cpf } from "./Cpf";
import { OrderItem } from "./OrderItem";

export class Order {
    private _cpf: Cpf;
    private _voucher: number;
    private _items: OrderItem[];

    constructor(cpf: string, voucher: number | null, items: OrderItem[]) {
        if (voucher && voucher < 0) throw Error('Voucher cannot be negative');
        this._cpf = new Cpf(cpf);
        this._voucher = voucher ?? 0;
        this._items = items;
    }

    public get price() {
        const sum = this._items.reduce((acc: number, item: OrderItem) => {
            return acc + item.totalPrice;
        }, 0);
        return sum - (sum * this._voucher);
    }

}
