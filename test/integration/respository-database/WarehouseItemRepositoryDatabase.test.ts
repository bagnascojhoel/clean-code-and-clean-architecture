import Sinon from "sinon"
import DatabaseConnectionKnexAdapter from "../../../src/infra/database/DatabaseConnectionKnexAdapter"
import WarehouseItemRepositoryDatabase from "../../../src/infra/repository-database/WarehouseItemRepositoryDatabase"
import WarehouseItemMother from "../../object-mother/WarehouseItemMother"

const connection = new DatabaseConnectionKnexAdapter()
const warehouseItemRepository = new WarehouseItemRepositoryDatabase(connection)

afterEach(() => {
    Sinon.restore()
    return Promise.all([
        connection.clear('warehouse_item'),
    ])
})

it('Should insert warehouse item', async () => {
    const actual = await warehouseItemRepository.insert(WarehouseItemMother.createCamera())
    expect(actual).toBeGreaterThanOrEqual(1)
})

it('Should contain warehouse item with given id', async () => {
    const camera = WarehouseItemMother.createCamera()
    const cameraOneId = await warehouseItemRepository.insert(camera)
    const actual = await warehouseItemRepository.findOne(cameraOneId)
    expect(actual).toBeTruthy()
    expect(actual.id).toBe(cameraOneId)
})

it('Should contain warehouse items with given id\'s', async () => {
    const camera = WarehouseItemMother.createCamera()
    const cameraOneId = await warehouseItemRepository.insert(camera)
    const cameraTwoId = await warehouseItemRepository.insert(camera)
    const actual = await warehouseItemRepository.findAll([cameraOneId, cameraTwoId])
    expect(actual.length).toBe(2)
    expect(actual[0].id).toBe(cameraOneId)
    expect(actual[1].id).toBe(cameraTwoId)
})