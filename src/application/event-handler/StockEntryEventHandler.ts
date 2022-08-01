import DomainEvent from "../../domain/event/DomainEvent";
import EventHandler from "../../domain/event/EventHandler";

export default class StockEntryEventHandler implements EventHandler {
    handle(domainEvent: DomainEvent): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
