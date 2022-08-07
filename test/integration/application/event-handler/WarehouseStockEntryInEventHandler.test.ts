import { DateTime } from "luxon"
import Sinon from "sinon"
import WarehouseStockEntryInEventHandler from "../../../../src/application/event-handler/WarehouseStockEntryInEventHandler"
import EventQueue from "../../../../src/domain/event/EventQueue"
import RepositoryFactory from "../../../../src/domain/factory/RepositoryFactory"
import DatabaseConnection from "../../../../src/infrastructure/database/DatabaseConnection"
import DatabaseConnectionKnexAdapter from "../../../../src/infrastructure/database/DatabaseConnectionKnexAdapter"
import DatabaseRepositoryFactory from "../../../../src/infrastructure/database/repository/DatabaseRepositoryFactory"
import EventQueueMemoryAdapter from "../../../../src/infrastructure/event/EventQueueMemoryAdapter"
import OrderCancelledEventMother from "../../../object-mother/domain-event/OrderCancelledEventMother"
import WarehouseItemMother from "../../../object-mother/WarehouseItemMother"

const connection: DatabaseConnection = new DatabaseConnectionKnexAdapter()
const repoFactory: RepositoryFactory = new DatabaseRepositoryFactory(connection)
const eventQueue: EventQueue = new EventQueueMemoryAdapter()
const handler = new WarehouseStockEntryInEventHandler(repoFactory, eventQueue)

describe('Application > EventHandler > WarehouseStockEntryInEventHandler', () => {
    beforeEach(async () => {
        Sinon.restore()
        await Promise.all([
            connection.clear('warehouse_item'),
            connection.clear('warehouse_stock_entry')
        ])
    })

    afterAll(async () => {
        connection.destroyConnection()
    })

    it('Should persist stock entries', async () => {
        const event = OrderCancelledEventMother.cancelledDouglasOrder()
        const warehouseItemRepo = repoFactory.createForWarehouseItem()
        const warehouseItem = WarehouseItemMother.createCamera()
        await warehouseItemRepo.save(warehouseItem)

        await handler.handle(event)

        const warehouseStockEntryRepository = repoFactory.createForWarehouseStockEntry()
        const entries = await warehouseStockEntryRepository.findAll(warehouseItem.id)
        expect(entries).toHaveLength(1)
        expect(entries[0].entryType).toEqual("in")
        expect(entries[0].quantity).toEqual(10)
        expect(entries[0].warehouseItemId).toEqual(warehouseItem.id)
        expect(entries[0].registeredAt.hasSame(DateTime.now(), 'minute')).toBeTruthy()
    })

    it('Should publish stock change event', async () => {
        const event = OrderCancelledEventMother.cancelledDouglasOrder()
        const warehouseItemRepo = repoFactory.createForWarehouseItem()
        const warehouseItem = WarehouseItemMother.createCamera()
        await warehouseItemRepo.save(warehouseItem)
        const spiedPublish = Sinon.spy(eventQueue, 'publish')

        await handler.handle(event)

        expect(spiedPublish.calledOnce).toBeTruthy()
        const capturedArgument = spiedPublish.getCall(0).firstArg
        expect(capturedArgument.entries).toHaveLength(1)
        expect(capturedArgument.entries[0].entryType).toEqual("in")
        expect(capturedArgument.entries[0].quantity).toEqual(10)
        expect(capturedArgument.entries[0].warehouseItemId).toEqual(warehouseItem.id)
        expect(capturedArgument.entries[0].registeredAt.hasSame(DateTime.now(), 'minute')).toBeTruthy()
    })
})