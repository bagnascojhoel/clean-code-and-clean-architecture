import EventHandler from "../../domain/event/EventHandler";
import WarehouseStockChangeEvent from "../../domain/event/WarehouseStockChangeEvent";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import WarehouseItemRepository from "../../domain/repository/WarehouseItemRepository";

export default class WarehouseStockChangeEventHandler implements EventHandler<WarehouseStockChangeEvent> {
    private readonly warehouseItemRepository: WarehouseItemRepository

    constructor(repositoryFactory: RepositoryFactory) {
        this.warehouseItemRepository = repositoryFactory.createForWarehouseItem()
    }

    async handle(domainEvent: WarehouseStockChangeEvent): Promise<void> {
        throw new Error("Method not implemented.");
    }

}
