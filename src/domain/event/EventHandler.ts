import DomainEvent from "./DomainEvent";

export default interface EventHandler<T extends DomainEvent> {
    handle(domainEvent: T): Promise<void>
}
