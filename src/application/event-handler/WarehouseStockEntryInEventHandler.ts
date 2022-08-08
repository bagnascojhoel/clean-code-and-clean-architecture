import { DateTime } from "luxon";
import WarehouseStockEntry from "../../domain/entity/warehouse/WarehouseStockEntry";
import EventHandler from "../../domain/event/EventHandler";
import EventQueue from "../../domain/event/EventQueue";
import OrderCancelledEvent from "../../domain/event/OrderCancelledEvent";
import WarehouseStockChangeEvent from "../../domain/event/WarehouseStockChangeEvent";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import WarehouseStockEntryRepository from "../../domain/repository/WarehouseStockEntryRepository";

export default class WarehouseStockEntryInEventHandler implements EventHandler<OrderCancelledEvent> {
    private readonly warehouseStockEntryRepository: WarehouseStockEntryRepository

    constructor(repositoryFactory: RepositoryFactory, private readonly eventQueue: EventQueue) {
        this.warehouseStockEntryRepository = repositoryFactory.createForWarehouseStockEntry()
    }

    async handle(domainEvent: OrderCancelledEvent): Promise<void> {
        const entries = domainEvent.orderItems.map(oi => WarehouseStockEntry.of("in", oi.warehouseItemId, oi.quantity, DateTime.now()))
        await this.warehouseStockEntryRepository.insert(entries)
        await this.eventQueue.publish(WarehouseStockChangeEvent.of(entries))
    }
}
