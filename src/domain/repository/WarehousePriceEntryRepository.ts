import { DateTime } from "luxon"
import { WarehouseItemId } from "../entity/warehouse/WarehouseItem"
import WarehousePriceEntry from "../entity/warehouse/WarehousePriceEntry"

export default interface WarehousePriceEntryRepository {
    create(entry: WarehousePriceEntry): Promise<number>
    findAllEffectiveOn(warehouseItemId: WarehouseItemId, on: DateTime): Promise<WarehousePriceEntry[]>
}
