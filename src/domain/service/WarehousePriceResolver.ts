import Decimal from "decimal.js";
import { DateTime } from "luxon";
import { WarehouseItemId } from "../entity/warehouse/WarehouseItem";
import WarehousePriceEntry from "../entity/warehouse/WarehousePriceEntry";

export default class WarehousePriceResolver {
    public static resolvePrice(entries: WarehousePriceEntry[], itemId: WarehouseItemId, effectiveDate: DateTime): Decimal {
        const latestEffectiveEntry = entries.reduce((closerEntry: WarehousePriceEntry | null, entry: WarehousePriceEntry) => {
            return entry.warehouseItemId === itemId && entry.isEffectiveAt(effectiveDate)
                ? WarehousePriceResolver.pickLatestEntry(entry, closerEntry)
                : closerEntry;
        }, null)
        if (!latestEffectiveEntry) throw `No entry could resolve price for ${itemId}`
        return latestEffectiveEntry.newPrice;
    }

    private static pickLatestEntry(entry1: WarehousePriceEntry, entry2: WarehousePriceEntry | null): WarehousePriceEntry {
        if (!entry2) return entry1
        return entry1.effectiveSince.toMillis() - entry2.effectiveSince.toMillis() > 0
            ? entry1
            : entry2
    }
}
