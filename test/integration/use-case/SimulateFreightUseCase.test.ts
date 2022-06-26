import Decimal from "decimal.js"
import SimulateFreightUseCase from "../../../src/application/use-case/SimulateFreightUseCase"
import WarehouseItem from "../../../src/domain/entity/WarehouseItem"
import DatabaseConnectionKnexAdapter from "../../../src/infra/database/DatabaseConnectionKnexAdapter"
import WarehouseItemRepositoryDatabase from "../../../src/infra/repository-database/WarehouseItemRepositoryDatabase"
import WarehouseItemMother from "../../object-mother/WarehouseItemMother"

const connection = new DatabaseConnectionKnexAdapter()
const warehouseRepository = new WarehouseItemRepositoryDatabase(connection)


afterEach(async () => {
    await Promise.all([
        connection.clear('warehouse_item')
    ])
})

afterAll(() => {
    connection.destroyConnection()
})

it('Should simulate freight using fixed origin and destination', async () => {
    // Arrange
    const camera = WarehouseItemMother.createCamera()
    await warehouseRepository.insert(camera)
    const fridge = WarehouseItemMother.createFridge()
    await warehouseRepository.insert(fridge)
    var useCase = new SimulateFreightUseCase(warehouseRepository)
    var input = {
        content: [
            { warehouseItemId: camera.id, quantity: new Decimal(10) },
            { warehouseItemId: fridge.id, quantity: new Decimal(2) }
        ]
    }
    // Act
    var actual = await useCase.execute(input)
    // Assert
    expect(actual).toEqual(new Decimal('1098.9'))
})