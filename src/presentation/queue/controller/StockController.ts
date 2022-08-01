import StockExitEventHandler from "../../../application/event-handler/StockExitEventHandler";
import EventQueue from "../../../domain/event/EventQueue";

export default class StockController {
    constructor(private readonly eventQueue: EventQueue) {
        eventQueue.consume("order-placed", new StockExitEventHandler())
    }
}
