import Decimal from "decimal.js";
import { WarehouseItemId } from "./WarehouseItem";

export default class OrderItem {
    constructor(
        readonly warehouseItemId: WarehouseItemId,
        readonly paidUnitaryPrice: Decimal,
        readonly quantity: number,
    ) {
        if (paidUnitaryPrice.isNegative()) throw new Error('Paid unitary price cannot be negative');
        if (quantity <= 0) throw new Error('Quantity cannot be zero or negative');
    }

    get totalPrice(): Decimal {
        return this.paidUnitaryPrice.times(this.quantity);
    }
}
