import Decimal from "decimal.js"
import { DateTime } from "luxon"
import WarehousePriceEntry from "../../../../../src/domain/entity/warehouse/WarehousePriceEntry"
import DatabaseConnection from "../../../../../src/infrastructure/database/DatabaseConnection"
import DatabaseConnectionKnexAdapter from "../../../../../src/infrastructure/database/DatabaseConnectionKnexAdapter"
import DatabaseRepositoryFactory from "../../../../../src/infrastructure/database/repository/DatabaseRepositoryFactory"
import DateTimeMother from "../../../../object-mother/DateTimeMother"
import WarehouseItemMother from "../../../../object-mother/WarehouseItemMother"

const connection: DatabaseConnection = new DatabaseConnectionKnexAdapter()
const repositoryFactory = new DatabaseRepositoryFactory(connection)
const warehouseItemRepository = repositoryFactory.createForWarehouseItem()
const subject = repositoryFactory.createForWarehousePriceEntry()

describe('Infrastructure > Database > Repository > WarehousePriceEntryRepository', () => {
    beforeEach(async () => {
        await connection.clear('warehouse_item')
        await connection.clear('warehouse_price_entry')
    })

    afterAll(async () => {
        await connection.destroyConnection()
    })

    it('Should create entry on database', async () => {
        const warehouseItem = WarehouseItemMother.createCamera()
        await warehouseItemRepository.save(warehouseItem)
        const newPrice = new Decimal('15.88')
        const entry = WarehousePriceEntry.for(warehouseItem.id, newPrice, DateTimeMother.createDouglasBirthdayAt2022())

        const actualId = await subject.create(entry)

        expect(actualId).toBeGreaterThan(0)
        const [{ rawPrice }] = await connection.query('select new_price as rawPrice from warehouse_price_entry where warehouse_price_entry_id = ?', actualId)
        expect(new Decimal(rawPrice)).toStrictEqual(newPrice)
    })

    it('Should be all effective entries for douglas birthday', async () => {
        const camera = WarehouseItemMother.createCamera()
        await warehouseItemRepository.save(camera)
        await subject.create(WarehousePriceEntry.for(camera.id, new Decimal(20), DateTime.fromISO('2022-02-10')))
        const expected = WarehousePriceEntry.for(camera.id, new Decimal(25), DateTime.fromISO('2021-12-30'))
        await subject.create(expected)

        const actual = await subject.findAllEffectiveOn(camera.id, DateTimeMother.createDouglasBirthdayAt2022())

        expect(actual).toContainEqual(expected)
    })
})