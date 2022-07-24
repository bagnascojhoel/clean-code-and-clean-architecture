import Decimal from "decimal.js";
import PhysicalAttributes from "./PhysicalAttributes";

export type WarehouseItemId = number

export default class WarehouseItem {
    private _quantityOnStock: number

    constructor(
        readonly id: WarehouseItemId,
        readonly description: string,
        quantityOnStock: number,
        readonly price: Decimal,
        readonly physicalAttributes: PhysicalAttributes
    ) {
        this.id = id
        this.description = description
        this.price = price
        this._quantityOnStock = quantityOnStock
        this.physicalAttributes = physicalAttributes
    }

    public removeFromStock(quantity: number): void {
        if (quantity > this.quantityOnStock)
            throw new Error(`Cannot remove ${quantity} units from stock, there are only ${this.quantityOnStock} available`)
        this._quantityOnStock -= quantity
    }

    get quantityOnStock(): number {
        return this._quantityOnStock
    }
}

