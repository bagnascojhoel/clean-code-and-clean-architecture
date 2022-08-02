import { WarehouseItemId } from "./WarehouseItem";

export default class WarehouseStockEntry {
    constructor(
        readonly type: "in" | "out",
        readonly warehouseItemId: WarehouseItemId,
        readonly quantity: number
    ) {

    }
}
