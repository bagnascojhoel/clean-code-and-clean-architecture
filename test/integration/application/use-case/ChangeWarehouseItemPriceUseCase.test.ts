import Decimal from "decimal.js";
import ChangeWarehouseItemPriceUseCase from "../../../../src/application/use-case/ChangeWarehouseItemPriceUseCase";
import RepositoryFactory from "../../../../src/domain/factory/RepositoryFactory";
import WarehouseItemRepository from "../../../../src/domain/repository/WarehouseItemRepository";
import WarehousePriceEntryRepository from "../../../../src/domain/repository/WarehousePriceEntryRepository";
import DatabaseConnection from "../../../../src/infrastructure/database/DatabaseConnection";
import DatabaseConnectionKnexAdapter from "../../../../src/infrastructure/database/DatabaseConnectionKnexAdapter";
import DatabaseRepositoryFactory from "../../../../src/infrastructure/database/repository/DatabaseRepositoryFactory";
import DateTimeMother from "../../../object-mother/DateTimeMother";
import WarehouseItemMother from "../../../object-mother/WarehouseItemMother";

const dbConnection: DatabaseConnection = new DatabaseConnectionKnexAdapter
const repositoryFactory: RepositoryFactory = new DatabaseRepositoryFactory(dbConnection)
const warehousePriceEntryRepository: WarehousePriceEntryRepository = repositoryFactory.createForWarehousePriceEntry()
const warehouseItemRepository: WarehouseItemRepository = repositoryFactory.createForWarehouseItem()

describe('Application > UseCase > ChangeWarehouseItemPrice', () => {
    beforeEach(async () => {
        await dbConnection.clear('warehouse_price_entry')
        await dbConnection.clear('warehouse_item')
    })

    afterAll(async () => {
        await dbConnection.destroyConnection()
    })

    it('Should be 15.66 effective on douglas birthday', async () => {
        const camera = WarehouseItemMother.createCamera()
        await warehouseItemRepository.save(camera)
        const useCase = new ChangeWarehouseItemPriceUseCase(repositoryFactory)
        const newPrice = new Decimal('15.66')
        await useCase.execute({ warehouseItemId: camera.id, newPrice, effectiveSince: DateTimeMother.createDouglasBirthdayAt2022() })
        const allEffectiveOn = await warehousePriceEntryRepository.findAllEffectiveOn(1, DateTimeMother.createDouglasBirthdayAt2022())
        expect(allEffectiveOn).toHaveLength(1)
        expect(allEffectiveOn[0].newPrice).toStrictEqual(newPrice)
    })

    it('Should throw when warehouse item does not exist', async () => {
        const useCase = new ChangeWarehouseItemPriceUseCase(repositoryFactory)
        const input = { warehouseItemId: 1, newPrice: new Decimal(12), effectiveSince: DateTimeMother.createDouglasBirthdayAt2022() }
        expect(async () => await useCase.execute(input)).rejects.toEqual('Warehouse item was not found')
    })
})