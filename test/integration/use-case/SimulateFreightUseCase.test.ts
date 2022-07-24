import Decimal from "decimal.js"
import SimulateFreightUseCase from "../../../src/application/use-case/SimulateFreightUseCase"
import DatabaseConnectionKnexAdapter from "../../../src/infra/database/DatabaseConnectionKnexAdapter"
import DatabaseRepositoryFactory from "../../../src/infra/repository-database/DatabaseRepositoryFactory"
import WarehouseItemMother from "../../object-mother/WarehouseItemMother"
import cleanUpDatabase from "../cleanUpDatabase"

const connection = new DatabaseConnectionKnexAdapter
const repoFactory = new DatabaseRepositoryFactory(connection)
const useCase = new SimulateFreightUseCase(repoFactory)
const warehouseRepository = repoFactory.createWarehouseItemRepository()

afterEach(async () => {
    await cleanUpDatabase(connection)
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