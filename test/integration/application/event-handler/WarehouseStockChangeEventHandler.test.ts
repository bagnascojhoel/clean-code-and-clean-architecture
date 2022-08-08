import WarehouseStockChangeEventHandler from "../../../../src/application/event-handler/WarehouseStockChangeEventHandler"
import WarehouseStockEntry from "../../../../src/domain/entity/warehouse/WarehouseStockEntry"
import EventQueue from "../../../../src/domain/event/EventQueue"
import WarehouseStockChangeEvent from "../../../../src/domain/event/WarehouseStockChangeEvent"
import RepositoryFactory from "../../../../src/domain/factory/RepositoryFactory"
import WarehouseItemRepository from "../../../../src/domain/repository/WarehouseItemRepository"
import DatabaseConnection from "../../../../src/infrastructure/database/DatabaseConnection"
import DatabaseConnectionKnexAdapter from "../../../../src/infrastructure/database/DatabaseConnectionKnexAdapter"
import DatabaseRepositoryFactory from "../../../../src/infrastructure/database/repository/DatabaseRepositoryFactory"
import EventQueueMemoryAdapter from "../../../../src/infrastructure/event/EventQueueMemoryAdapter"
import DateTimeMother from "../../../object-mother/DateTimeMother"
import WarehouseItemMother from "../../../object-mother/WarehouseItemMother"

const connection: DatabaseConnection = new DatabaseConnectionKnexAdapter()
const repoFactory: RepositoryFactory = new DatabaseRepositoryFactory(connection)
const eventQueue: EventQueue = new EventQueueMemoryAdapter()
const handler = new WarehouseStockChangeEventHandler(repoFactory, eventQueue)

const warehouseItemRepository: WarehouseItemRepository = repoFactory.createForWarehouseItem()

describe('Application > EventHandler > WarehouseStockChangeEventHandler', () => {
    beforeEach(async () => {
        await Promise.all([
            connection.clear('warehouse_item'),
            connection.clear('warehouse_stock_entry')
        ])
    })

    afterAll(async () => {
        connection.destroyConnection()
    })

    it('Should increase stock quantity of an item', async () => {
        const warehouseItem = WarehouseItemMother.createCamera()
        await warehouseItemRepository.save(warehouseItem)

        const stockEntryIn = WarehouseStockEntry.of("in", warehouseItem.id, 12, DateTimeMother.createDouglasBirthdayAt2022())
        const event = WarehouseStockChangeEvent.of([stockEntryIn])

        await handler.handle(event)

        const actual = await warehouseItemRepository.findOne(warehouseItem.id)
        const expectedQuantity = warehouseItem.quantity + stockEntryIn.quantity
        expect(actual?.quantity).toBe(expectedQuantity)
    })

    it('Should reduce stock quantity of an item', async () => {
        const warehouseItem = WarehouseItemMother.createCamera()
        await warehouseItemRepository.save(warehouseItem)

        const stockEntryIn = WarehouseStockEntry.of("out", warehouseItem.id, 12, DateTimeMother.createDouglasBirthdayAt2022())
        const event = WarehouseStockChangeEvent.of([stockEntryIn])

        await handler.handle(event)

        const actual = await warehouseItemRepository.findOne(warehouseItem.id)
        const expectedQuantity = warehouseItem.quantity - stockEntryIn.quantity
        expect(actual?.quantity).toBe(expectedQuantity)
    })
})