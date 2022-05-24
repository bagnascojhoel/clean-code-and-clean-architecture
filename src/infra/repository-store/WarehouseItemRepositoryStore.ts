import WarehouseItem from "../../domain/entity/WarehouseItem";
import WarehouseItemRepository from "../../domain/repository/WarehouseItemRepository";


export default class WarehouseItemRepositoryMemory implements WarehouseItemRepository {
    private warehouseItems: WarehouseItem[] = []

    create(warehouseItem: WarehouseItem): number {
        const sequenceId = this.warehouseItems.length;
        const newItem = new WarehouseItem(
            sequenceId,
            warehouseItem.description,
            warehouseItem.quantity,
            warehouseItem.physicalAttributes
        );
        this.warehouseItems = [...this.warehouseItems, newItem]
        return newItem.id;
    }

}
