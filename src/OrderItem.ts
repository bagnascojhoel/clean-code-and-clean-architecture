import WarehouseItem from "./WarehouseItem";

export default class OrderItem {

    constructor(
        readonly warehouseItem: WarehouseItem,
        readonly paidUnitaryPrice: number,
        readonly quantity: number,
    ) {
        if (paidUnitaryPrice <= 0) throw new Error('Paid unitary price cannot be negative');
        if (quantity <= 0) throw new Error('Quantity cannot be zero or negative');
        this.warehouseItem = warehouseItem;
        this.paidUnitaryPrice = paidUnitaryPrice;
        this.quantity = quantity;
    }

    public get totalPrice() {
        return this.paidUnitaryPrice * this.quantity;
    }

}
