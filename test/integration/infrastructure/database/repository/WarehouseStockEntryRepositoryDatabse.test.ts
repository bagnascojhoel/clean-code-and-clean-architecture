import WarehouseStockEntry from "../../../../../src/domain/entity/warehouse/WarehouseStockEntry"
import WarehouseItemRepository from "../../../../../src/domain/repository/WarehouseItemRepository"
import DatabaseConnection from "../../../../../src/infrastructure/database/DatabaseConnection"
import DatabaseConnectionKnexAdapter from "../../../../../src/infrastructure/database/DatabaseConnectionKnexAdapter"
import DatabaseRepositoryFactory from "../../../../../src/infrastructure/database/repository/DatabaseRepositoryFactory"
import DateTimeMother from "../../../../object-mother/DateTimeMother"
import WarehouseItemMother from "../../../../object-mother/WarehouseItemMother"

const connection: DatabaseConnection = new DatabaseConnectionKnexAdapter()
const repositoryFactory = new DatabaseRepositoryFactory(connection)
const warehouseItemRepository: WarehouseItemRepository = repositoryFactory.createForWarehouseItem()

describe('Infrastructure > Database > Repository > WarehouseStockEntryRepository', () => {
    beforeEach(async () => {
        await connection.clear('warehouse_item')
        await connection.clear('warehouse_stock_entry')
    })

    afterAll(async () => {
        await connection.destroyConnection()
    })

    it('Should persist entries on database', async () => {
        const warehouseItem = WarehouseItemMother.createCamera()
        await warehouseItemRepository.save(warehouseItem)
        const repository = repositoryFactory.createForWarehouseStockEntry()
        const entryIn = WarehouseStockEntry.of("in", warehouseItem.id, 10, DateTimeMother.createDouglasBirthdayAt2022())
        const entryOut = WarehouseStockEntry.of("out", warehouseItem.id, 5, DateTimeMother.createDouglasBirthdayAt2022())

        await repository.insert([entryIn, entryOut])

        const [{ registries }] = await connection.query("SELECT count(1) registries FROM warehouse_stock_entry WHERE warehouse_item_id = ?", warehouseItem.id)
        expect(registries).toBe(2)
    })

    it('Should persist nothing when entries array is empty', async () => {
        const repository = repositoryFactory.createForWarehouseStockEntry()

        await repository.insert([])

        const [{ registries }] = await connection.query("SELECT count(1) registries FROM warehouse_stock_entry")
        expect(registries).toBe(0)
    })

    it('Should find all persisted entries', async () => {
        const warehouseItem = WarehouseItemMother.createCamera()
        await warehouseItemRepository.save(warehouseItem)
        const repository = repositoryFactory.createForWarehouseStockEntry()
        const entryIn = WarehouseStockEntry.of("in", warehouseItem.id, 10, DateTimeMother.createDouglasBirthdayAt2022())
        const entryOut = WarehouseStockEntry.of("out", warehouseItem.id, 5, DateTimeMother.createDouglasBirthdayAt2022())
        await repository.insert([entryIn, entryOut])

        const actual = await repository.findAll(warehouseItem.id)

        expect(actual).toEqual([entryIn, entryOut])
    })
})