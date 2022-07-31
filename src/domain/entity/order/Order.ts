import { DateTime } from "luxon";
import Cpf from "../Cpf";
import OrderCode from "./OrderCode";
import OrderItem from "./OrderItem";

export default class Order {
    readonly cpf: Cpf;
    private _abortedAt?: DateTime

    constructor(
        readonly code: OrderCode,
        readonly createdAt: DateTime,
        cpf: string | Cpf,
        readonly items: OrderItem[]
    ) {
        if (items.length === 0) throw new Error('Order must have at least one item')
        if (this.containsDuplicatedItems(items)) throw new Error('There shouldn\'t be more than one item of the same product')
        this.code = code
        this.cpf = Cpf.of(cpf);
        this.createdAt = createdAt;
        this.items = items;
    }

    public abort(when: DateTime): void {
        this._abortedAt = when;
    }

    private containsDuplicatedItems(orderItems: OrderItem[]): boolean {
        const distinct = new Set()
        for (const v of orderItems)
            if (distinct.has(v.warehouseItemId)) return true
            else distinct.add(v.warehouseItemId)
        return false
    }

    get abortedAt(): DateTime | undefined {
        return this._abortedAt
    }
}
