import WarehouseItem, { WarehouseItemId } from "../entity/WarehouseItem";

export default interface WarehouseItemRepository {
    findAll(ids: WarehouseItemId[]): Promise<WarehouseItem[]>
    findOne(id: WarehouseItemId): Promise<WarehouseItem | null>
    save(warehouseItem: WarehouseItem): Promise<void>
}
