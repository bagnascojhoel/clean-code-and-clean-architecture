import WarehouseStockEntry from "../entity/warehouse/WarehouseStockEntry";

export default interface WarehouseStockEntryRepository {
    insert(entries: WarehouseStockEntry[]): Promise<void>
}
