import { WarehouseItemId } from "../entity/warehouse/WarehouseItem";
import WarehouseStockEntry from "../entity/warehouse/WarehouseStockEntry";

export default interface WarehouseStockEntryRepository {
    insert(entries: WarehouseStockEntry[]): Promise<void>
    findAll(warehouseItemId: WarehouseItemId): Promise<WarehouseStockEntry[]>
}
