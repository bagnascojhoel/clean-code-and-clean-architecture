import WarehouseItem from "../entity/WarehouseItem";

export default interface WarehouseItemRepository {
    create(warehouseItem: WarehouseItem): number;
}
