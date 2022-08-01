import DomainEvent from "../../domain/event/DomainEvent";
import EventQueue, { DomainEventHandler } from "../../domain/event/EventQueue";


export default class EventQueueMemoryAdapter implements EventQueue {
    private readonly consumers: Consumer[]

    constructor() {
        this.consumers = []
    }

    async consume(eventName: string, handler: DomainEventHandler): Promise<void> {
        this.consumers.push({ eventName, handler })
    }

    async publish(domainEvent: DomainEvent): Promise<void> {
        this.consumers.forEach(({ eventName, handler }) => {
            if (domainEvent.key === eventName)
                handler(domainEvent)
        })
    }

}

type Consumer = {
    eventName: string,
    handler: DomainEventHandler
}
