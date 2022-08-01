import DomainEvent from "./DomainEvent";

export default interface EventHandler {
    handle(domainEvent: DomainEvent): Promise<void>
}
