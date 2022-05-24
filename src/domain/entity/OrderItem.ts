import Decimal from "decimal.js";
import Prototype from "../Prototype";
import Freightable from "./Freightable";
import PhysicalAttributes from "./PhysicalAttributes";
import WarehouseItem from "./WarehouseItem";

export default class OrderItem implements Freightable, Prototype<OrderItem> {
    private _quantity: number;

    constructor(
        readonly warehouseItem: WarehouseItem,
        readonly paidUnitaryPrice: Decimal,
        quantity: number,
    ) {
        if (paidUnitaryPrice.isNegative()) throw new Error('Paid unitary price cannot be negative');
        if (quantity <= 0) throw new Error('Quantity cannot be zero or negative');
        this.warehouseItem = warehouseItem;
        this.paidUnitaryPrice = paidUnitaryPrice;
        this._quantity = quantity;
    }

    get totalPrice(): Decimal {
        return this.paidUnitaryPrice.times(this._quantity);
    }

    quantity(): number {
        return this._quantity;
    }

    unitaryPhysicalAttributes(): PhysicalAttributes {
        return this.warehouseItem.physicalAttributes;
    }

    cloneDeep(payload?: any): OrderItem {
        const warehouseItem = payload?.warehouseItem ?? this.warehouseItem;
        const paidUnitaryPrice = payload?.paidUnitaryPrice ?? this.paidUnitaryPrice;
        const quantity = payload?.quantity ?? this._quantity;
        return new OrderItem(warehouseItem, paidUnitaryPrice, quantity)
    }

}
