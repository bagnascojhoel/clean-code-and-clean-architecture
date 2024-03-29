import Sinon from "sinon"
import FetchOrderUseCase, { FetchOrderPresenter } from "../../../../src/application/use-case/FetchOrderUseCase"
import Order from "../../../../src/domain/entity/order/Order"
import DatabaseConnectionKnexAdapter from "../../../../src/infrastructure/database/DatabaseConnectionKnexAdapter"
import DatabaseRepositoryFactory from "../../../../src/infrastructure/database/repository/DatabaseRepositoryFactory"
import OrderMother from "../../../object-mother/OrderMother"
import WarehouseItemMother from "../../../object-mother/WarehouseItemMother"
import cleanUpDatabase from "../../cleanUpDatabase"

const connection = new DatabaseConnectionKnexAdapter
const repoFactory = new DatabaseRepositoryFactory(connection)
const fetchOrderUseCase = new FetchOrderUseCase(repoFactory)
const orderRepository = repoFactory.createForOrder()
const warehouseItemRepository = repoFactory.createForWarehouseItem()
const fakePresenter: FetchOrderPresenter = {
    onSuccess(order) { },
    onNotFound() { }
}

afterEach(async () => {
    Sinon.restore()
    await cleanUpDatabase(connection)
})

afterAll(async () => connection.destroyConnection())

it('Should fetch order', async () => {
    await warehouseItemRepository.save(WarehouseItemMother.createCamera());
    const generatedCode = await orderRepository.save(OrderMother.createRubensOrder());
    let actual: Order | undefined;
    const presenter = Sinon.spy({
        onSuccess(order: Order) {
            actual = order
        },
        onNotFound() {

        }
    })
    await fetchOrderUseCase.execute({ orderCode: generatedCode.value }, presenter)
    expect(actual?.code.value).toBe(generatedCode.value)
    expect(presenter.onNotFound.notCalled).toBeTruthy()
})

it('Should be not found when order does not exist', async () => {
    const presenter = Sinon.spy(fakePresenter)
    await fetchOrderUseCase.execute({ orderCode: 'unexistent' }, presenter)
    expect(presenter.onNotFound.calledOnce).toBeTruthy()
    expect(presenter.onSuccess.notCalled).toBeTruthy()
})