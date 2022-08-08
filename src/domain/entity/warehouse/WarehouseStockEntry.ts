import { DateTime } from "luxon";
import { WarehouseItemId } from "./WarehouseItem";

export default class WarehouseStockEntry {
    private constructor(
        readonly entryType: EntryType,
        readonly warehouseItemId: WarehouseItemId,
        readonly quantity: number,
        readonly registeredAt: DateTime
    ) { }

    public static of(
        type: EntryType,
        warehouseItemId: WarehouseItemId,
        quantity: number,
        registeredAt: DateTime
    ) {
        return new WarehouseStockEntry(type, warehouseItemId, quantity, registeredAt)
    }
}

type EntryType = "in" | "out"
