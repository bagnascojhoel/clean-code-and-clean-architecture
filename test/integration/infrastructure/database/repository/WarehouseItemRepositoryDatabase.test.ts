import Sinon from "sinon"
import DatabaseConnectionKnexAdapter from "../../../../../src/infrastructure/database/DatabaseConnectionKnexAdapter"
import WarehouseItemRepositoryDatabase from "../../../../../src/infrastructure/database/repository/WarehouseItemRepositoryDatabase"
import WarehouseItemMother from "../../../../object-mother/WarehouseItemMother"
import cleanUpDatabase from "../../../cleanUpDatabase"

const connection = new DatabaseConnectionKnexAdapter()
const warehouseItemRepository = new WarehouseItemRepositoryDatabase(connection)

describe('Infrastructure > Database > Repository > WarehouseItemRepository', () => {
    afterEach(async () => {
        Sinon.restore()
        await cleanUpDatabase(connection)
    })

    afterAll(async () => connection.destroyConnection())

    it('Should insert warehouse item', async () => {
        const camera = WarehouseItemMother.createCamera()
        await warehouseItemRepository.save(camera)
        const actual = await connection.query(`select description from warehouse_item where warehouse_item_id = ${camera.id}`)
        expect(actual[0].description).toBe(camera.description)
    })

    it('Should contain warehouse item with given id', async () => {
        const camera = WarehouseItemMother.createCamera()
        await warehouseItemRepository.save(camera)
        const actual = await warehouseItemRepository.findOne(camera.id)
        expect(actual).toBeTruthy()
        expect(actual?.id).toBe(camera.id)
    })

    it('Should be null when finding a non-existent warehouse item', async () => {
        const actual = await warehouseItemRepository.findOne(999)
        expect(actual).toBe(null)
    })

    it('Should contain warehouse items with given id\'s', async () => {
        const camera = WarehouseItemMother.createCamera()
        await warehouseItemRepository.save(camera)
        const fridge = WarehouseItemMother.createFridge()
        await warehouseItemRepository.save(fridge)
        const actual = await warehouseItemRepository.findAll([camera.id, fridge.id])
        expect(actual.length).toBe(2)
        expect(actual[0].id).toBe(camera.id)
        expect(actual[1].id).toBe(fridge.id)
    })

    it('Should be false when any item do not exist', async () => {
        const camera = WarehouseItemMother.createCamera()
        await warehouseItemRepository.save(camera)
        const actual = await warehouseItemRepository.exists([1, 123])
        expect(actual).toBeFalsy()
    })

    it('Should be true when all items exist', async () => {
        const camera = WarehouseItemMother.createCamera()
        await warehouseItemRepository.save(camera)
        const fridge = WarehouseItemMother.createFridge()
        await warehouseItemRepository.save(fridge)
        const actual = await warehouseItemRepository.exists([1, 2])
        expect(actual).toBeTruthy()
    })
})