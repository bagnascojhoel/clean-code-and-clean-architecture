import Sinon from "sinon"
import AbortOrderUseCase from "../../../../src/application/use-case/AbortOrderUseCase"
import PlaceOrderUseCase from "../../../../src/application/use-case/PlaceOrderUseCase"
import OrderCode from "../../../../src/domain/entity/order/OrderCode"
import DatabaseConnectionKnexAdapter from "../../../../src/infrastructure/database/DatabaseConnectionKnexAdapter"
import DatabaseRepositoryFactory from "../../../../src/infrastructure/database/repository/DatabaseRepositoryFactory"
import CpfMother from "../../../object-mother/CpfMother"
import WarehouseItemMother from "../../../object-mother/WarehouseItemMother"
import cleanUpDatabase from "../../cleanUpDatabase"

const connection = new DatabaseConnectionKnexAdapter()
const repoFactory = new DatabaseRepositoryFactory(connection)
const warehouseItemRepository = repoFactory.createForWarehouseItem()
const fakePresenter = {
    onSuccess: () => { },
    onNotFound: () => { }
}

afterEach(async () => {
    Sinon.restore()
    await cleanUpDatabase(connection)
})

afterAll(async () => connection.destroyConnection())

it.skip('Should be not found when order does not exists', async () => {
    const spiedFakePresenter = Sinon.spy(fakePresenter)
    const abortOrderUseCase = new AbortOrderUseCase(repoFactory)
    await abortOrderUseCase.execute({ orderCode: OrderCode.fromValue('ABC123') }, spiedFakePresenter)
    expect(spiedFakePresenter.onSuccess.calledOnce).toBeFalsy()
    expect(spiedFakePresenter.onNotFound.called).toBeTruthy()
})

it.skip('Should be success when order exists', async () => {
    const spiedFakePresenter = Sinon.spy(fakePresenter)
    const abortOrderUseCase = new AbortOrderUseCase(repoFactory)
    const placeOrderUseCase = new PlaceOrderUseCase(repoFactory)
    const warehouseItem = WarehouseItemMother.createCamera()
    await warehouseItemRepository.save(warehouseItem)
    const placeOrderInput = { cpf: CpfMother.createOfRubens(), items: [{ warehouseItemId: warehouseItem.id, quantity: 1 }] }
    const orderCode = await placeOrderUseCase.execute(placeOrderInput)
    await abortOrderUseCase.execute({ orderCode }, spiedFakePresenter)
    expect(spiedFakePresenter.onSuccess.calledOnce).toBeTruthy()
    expect(spiedFakePresenter.onNotFound.called).toBeTruthy()
})

it.skip('Should replace orders from order on stock when successfully aborting order', async () => {

})