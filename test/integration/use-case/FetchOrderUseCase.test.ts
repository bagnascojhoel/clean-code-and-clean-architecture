import Sinon from "sinon"
import FetchOrderUseCase, { FetchOrderPresenter } from "../../../src/application/use-case/FetchOrderUseCase"
import Order from "../../../src/domain/entity/Order"
import DatabaseConnectionKnexAdapter from "../../../src/infra/database/DatabaseConnectionKnexAdapter"
import OrderRepositoryDatabase from "../../../src/infra/repository-database/OrderRepositoryDatabase"
import WarehouseItemRepositoryDatabase from "../../../src/infra/repository-database/WarehouseItemRepositoryDatabase"
import OrderMother from "../../object-mother/OrderMother"
import WarehouseItemMother from "../../object-mother/WarehouseItemMother"
import cleanUpDatabase from "../cleanUpDatabase"

const connection = new DatabaseConnectionKnexAdapter()
const orderRepository = new OrderRepositoryDatabase(connection);
const warehouseItemRepository = new WarehouseItemRepositoryDatabase(connection);
const fetchOrderUseCase = new FetchOrderUseCase(orderRepository)
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
    await warehouseItemRepository.insert(WarehouseItemMother.createCamera());
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