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
    const camera = WarehouseItemMother.createCamera()
    await warehouseRepository.save(camera)
    const fridge = WarehouseItemMother.createFridge()
    await warehouseRepository.save(fridge)
    var input = {
        content: [
            { warehouseItemId: camera.id, quantity: 10 },
            { warehouseItemId: fridge.id, quantity: 2 }
        ]
    }

    var actual = await useCase.execute(input)

    expect(actual).toEqual(new Decimal('1098.9'))
})