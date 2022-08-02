import WarehouseStockChangeEventHandler from "../../../application/event-handler/WarehouseStockChangeEventHandler";
import WarehouseStockEntryInEventHandler from "../../../application/event-handler/WarehouseStockEntryInEventHandler";
import WarehouseStockEntryOutEventHandler from "../../../application/event-handler/WarehouseStockEntryOutEventHandler";
import EventQueue from "../../../domain/event/EventQueue";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";

export default class WarehouseStockController {
    constructor(eventQueue: EventQueue, repositoryFactory: RepositoryFactory) {
        eventQueue.consume("order-placed", new WarehouseStockEntryOutEventHandler(repositoryFactory, eventQueue))
        eventQueue.consume("order-cancelled", new WarehouseStockEntryInEventHandler(repositoryFactory, eventQueue))
        eventQueue.consume("warehouse-stock-change", new WarehouseStockChangeEventHandler(repositoryFactory))
    }
}
