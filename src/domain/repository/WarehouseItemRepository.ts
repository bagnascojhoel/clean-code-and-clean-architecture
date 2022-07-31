import WarehouseItem, { WarehouseItemId } from "../entity/warehouse/WarehouseItem";

export default interface WarehouseItemRepository {
    findAll(ids: WarehouseItemId[]): Promise<WarehouseItem[]>
    exists(ids: WarehouseItemId[]): Promise<boolean>
    findOne(id: WarehouseItemId): Promise<WarehouseItem | null>
    save(warehouseItem: WarehouseItem): Promise<void>
}
