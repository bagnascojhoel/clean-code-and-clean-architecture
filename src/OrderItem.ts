import Decimal from "decimal.js";
import Freightable from "./Freightable";
import PhysicalAttributes from "./PhysicalAttributes";
import WarehouseItem from "./WarehouseItem";

export default class OrderItem implements Freightable {
    private _quantity: number;

    constructor(
        readonly warehouseItem: WarehouseItem,
        readonly paidUnitaryPrice: number,
        quantity: number,
    ) {
        if (paidUnitaryPrice <= 0) throw new Error('Paid unitary price cannot be negative');
        if (quantity <= 0) throw new Error('Quantity cannot be zero or negative');
        this.warehouseItem = warehouseItem;
        this.paidUnitaryPrice = paidUnitaryPrice;
        this._quantity = quantity;
    }

    get totalPrice() {
        return this.paidUnitaryPrice * this._quantity;
    }

    quantity(): number {
        return this._quantity;
    }

    unitaryPhysicalAttributes(): PhysicalAttributes {
        return this.warehouseItem.physicalAttributes;
    }

}
