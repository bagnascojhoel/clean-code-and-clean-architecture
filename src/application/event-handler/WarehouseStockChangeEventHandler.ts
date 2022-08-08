import WarehouseItem from "../../domain/entity/warehouse/WarehouseItem";
import WarehouseStockEntry from "../../domain/entity/warehouse/WarehouseStockEntry";
import EventHandler from "../../domain/event/EventHandler";
import EventQueue from "../../domain/event/EventQueue";
import WarehouseStockChangeEvent from "../../domain/event/WarehouseStockChangeEvent";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import WarehouseItemRepository from "../../domain/repository/WarehouseItemRepository";

export default class WarehouseStockChangeEventHandler implements EventHandler<WarehouseStockChangeEvent> {
    private readonly warehouseItemRepository: WarehouseItemRepository

    constructor(repositoryFactory: RepositoryFactory, private readonly eventQueue: EventQueue) {
        this.warehouseItemRepository = repositoryFactory.createForWarehouseItem()
    }

    async handle(domainEvent: WarehouseStockChangeEvent): Promise<void> {
        const changedItemIds = domainEvent.entries.map(w => w.warehouseItemId)
        const changedItems = await this.warehouseItemRepository.findAll(changedItemIds)
        // NOTE This would be better with a saveAll or simply with a transaction/unit of work for every change.
        // NOTE An item should not have negative quantity. Domain should throw an error and this
        //      handler could invoke cancel order use case.
        for (const changedItem of changedItems) {
            this.updateQuantity(changedItem, domainEvent.entries)
            await this.warehouseItemRepository.save(changedItem)
        }
    }

    private updateQuantity(warehouseItem: WarehouseItem, entries: WarehouseStockEntry[]): void {
        const stockEntry = entries.find(e => warehouseItem.id === e.warehouseItemId)
        if (!stockEntry) return;
        if (stockEntry.entryType === "in")
            warehouseItem.quantity += stockEntry.quantity
        else
            warehouseItem.quantity -= stockEntry.quantity
    }

}
