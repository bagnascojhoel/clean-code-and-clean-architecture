import { DateTime } from "luxon";
import WarehouseStockEntry from "../../domain/entity/warehouse/WarehouseStockEntry";
import EventHandler from "../../domain/event/EventHandler";
import EventQueue from "../../domain/event/EventQueue";
import OrderPlacedEvent from "../../domain/event/OrderPlacedEvent";
import WarehouseStockChangeEvent from "../../domain/event/WarehouseStockChangeEvent";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import WarehouseStockEntryRepository from "../../domain/repository/WarehouseStockEntryRepository";

export default class WarehouseStockEntryOutEventHandler implements EventHandler<OrderPlacedEvent> {
    private readonly warehouseStockEntryRepository: WarehouseStockEntryRepository

    constructor(
        repositoryFactory: RepositoryFactory,
        private readonly eventQueue: EventQueue
    ) {
        this.warehouseStockEntryRepository = repositoryFactory.createForWarehouseStockEntry()
    }

    async handle(domainEvent: OrderPlacedEvent): Promise<void> {
        const entries = domainEvent.orderItems.map(oi => WarehouseStockEntry.of("out", oi.warehouseItemId, oi.quantity, DateTime.now()))
        await this.warehouseStockEntryRepository.insert(entries)
        await this.eventQueue.publish(WarehouseStockChangeEvent.of(entries))
    }
}
