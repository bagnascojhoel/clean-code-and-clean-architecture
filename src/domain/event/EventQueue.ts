import DomainEvent from "./DomainEvent";
import EventHandler from "./EventHandler";

export default interface EventQueue {
    consume(eventName: string, handler: EventHandler<DomainEvent>): Promise<void>
    publish(domainEvent: DomainEvent): Promise<void>
}

