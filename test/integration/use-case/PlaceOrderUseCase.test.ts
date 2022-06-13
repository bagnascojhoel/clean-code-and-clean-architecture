import { DateTime, Settings } from "luxon";
import Sinon from "sinon";
import PlaceOrderUseCase from "../../../src/application/use-case/PlaceOrderUseCase";
import Order from "../../../src/domain/entity/Order";
import DatabaseConnectionKnexAdapter from "../../../src/infra/database/DatabaseConnectionKnexAdapter";
import OrderRepositoryDatabase from "../../../src/infra/repository-database/OrderRepositoryDatabase";
import WarehouseItemRepositoryDatabase from "../../../src/infra/repository-database/WarehouseItemRepositoryDatabase";
import CpfMother from "../../object-mother/CpfMother";
import WarehouseItemMother from "../../object-mother/WarehouseItemMother";

const connection = new DatabaseConnectionKnexAdapter()
const warehouseItemRepository = new WarehouseItemRepositoryDatabase(connection)
const orderRepository = new OrderRepositoryDatabase(connection)

afterEach(() => {
    Sinon.restore()
    return Promise.all([
        connection.clear('order_item'),
        connection.clear('order'),
        connection.clear('warehouse_item'),
    ])
})

it('Should create order and persist it', async () => {
    const warehouseItemId = await warehouseItemRepository.insert(WarehouseItemMother.createCamera())
    const orderContent = {
        cpf: CpfMother.createOfRubens(),
        items: [{ warehouseItemId, quantity: 10 }]
    }
    const stubbedOrderRepository = Sinon.stub(orderRepository)
    const placeOrderUseCase = new PlaceOrderUseCase(stubbedOrderRepository, warehouseItemRepository)
    await placeOrderUseCase.execute(orderContent)
    expect(stubbedOrderRepository.save.called).toBeTruthy()
})