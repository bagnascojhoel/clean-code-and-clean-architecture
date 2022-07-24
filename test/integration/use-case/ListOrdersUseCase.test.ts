import Sinon, { SinonSpiedInstance } from "sinon";
import ListOrdersUseCase, { ListOrdersPresenter } from "../../../src/application/use-case/ListOrdersUseCase";
import Order from "../../../src/domain/entity/Order";
import DatabaseConnectionKnexAdapter from "../../../src/infra/database/DatabaseConnectionKnexAdapter";
import DatabaseRepositoryFactory from "../../../src/infra/repository-database/DatabaseRepositoryFactory";
import OrderMother from "../../object-mother/OrderMother";
import WarehouseItemMother from "../../object-mother/WarehouseItemMother";
import cleanUpDatabase from "../cleanUpDatabase";

const connection = new DatabaseConnectionKnexAdapter
const repoFactory = new DatabaseRepositoryFactory(connection)
const listOrdersUseCase = new ListOrdersUseCase(repoFactory)
const orderRepository = repoFactory.createOrderRepository()
const warehouseItemRepository = repoFactory.createWarehouseItemRepository()

afterEach(async () => {
    Sinon.restore()
    await cleanUpDatabase(connection)
})

afterAll(async () => connection.destroyConnection())
it('Should be empty list when there are no orders', async () => {
    let actual: Order[] | undefined;
    const presenter: SinonSpiedInstance<ListOrdersPresenter> = Sinon.spy({ onSuccess(orders) { actual = orders } })
    await listOrdersUseCase.execute(presenter)
    expect(presenter.onSuccess.calledOnce).toBeTruthy()
    expect(actual).toEqual([])
})


it('Should be order list when there is at least one order', async () => {
    await warehouseItemRepository.insert(WarehouseItemMother.createCamera())
    const order = OrderMother.createRubensOrder()
    await orderRepository.save(order);
    let actual: Order[] | undefined;
    const presenter: SinonSpiedInstance<ListOrdersPresenter> = Sinon.spy({ onSuccess(orders) { actual = orders } })
    await listOrdersUseCase.execute(presenter)
    expect(presenter.onSuccess.calledOnce).toBeTruthy()
    expect(actual).toStrictEqual([order])
})