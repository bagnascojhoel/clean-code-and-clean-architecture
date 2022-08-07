import DomainEvent from "../../domain/event/DomainEvent";
import EventHandler from "../../domain/event/EventHandler";
import EventQueue from "../../domain/event/EventQueue";


export default class EventQueueMemoryAdapter implements EventQueue {
    private readonly consumers: Consumer[]

    constructor() {
        this.consumers = []
    }

    async consume(eventName: string, handler: EventHandler<DomainEvent>): Promise<void> {
        this.consumers.push({ eventName, handler })
    }

    async publish(domainEvent: DomainEvent): Promise<void> {
        this.consumers.forEach(({ eventName, handler }) => {
            if (domainEvent.key === eventName)
                handler.handle(domainEvent)
        })
    }

}

type Consumer = {
    eventName: string,
    handler: EventHandler<DomainEvent>
}
