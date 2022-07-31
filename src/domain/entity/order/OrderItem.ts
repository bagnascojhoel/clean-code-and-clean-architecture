import { WarehouseItemId } from "../warehouse/WarehouseItem";

export default class OrderItem {
    constructor(
        readonly warehouseItemId: WarehouseItemId,
        readonly quantity: number,
    ) {
        if (quantity <= 0) throw new Error('Quantity cannot be zero or negative');
    }
}
