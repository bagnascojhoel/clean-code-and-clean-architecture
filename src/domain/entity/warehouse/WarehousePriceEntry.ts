import Decimal from "decimal.js";
import { DateTime } from "luxon";
import { WarehouseItemId } from "./WarehouseItem";

export default class WarehousePriceEntry {
    readonly warehouseItemId: WarehouseItemId
    readonly newPrice: Decimal
    readonly effectiveSince: DateTime

    private constructor(warehouseItemId: WarehouseItemId, newPrice: Decimal, effectiveSince: DateTime) {
        this.warehouseItemId = warehouseItemId
        this.newPrice = newPrice
        this.effectiveSince = effectiveSince
    }

    public static for(id: WarehouseItemId, newPrice: Decimal, effectiveSince: DateTime): WarehousePriceEntry {
        return new WarehousePriceEntry(id, newPrice, effectiveSince)
    }

    public isEffectiveAt(at: DateTime): boolean {
        return this.effectiveSince.toMillis() - at.toMillis() < 0
    }
}
