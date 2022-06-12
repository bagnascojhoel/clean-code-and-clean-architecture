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

it('Should create order and persist it', async () => {
    const warehouseItemId = await warehouseItemRepository.insert(WarehouseItemMother.createCamera())
    const orderContent = {
        cpf: CpfMother.createOfRubens(),
        items: [{ warehouseItemId, quantity: 10 }]
    }
    const stubbedOrderRepository = Sinon.stub(orderRepository)
    const placeOrderUseCase = new PlaceOrderUseCase(stubbedOrderRepository, warehouseItemRepository)
    const actual = await placeOrderUseCase.execute(orderContent)
})

// TODO Fix this test
it.skip('Should create order with UTC time', async () => {
    // Arrange
    Settings.defaultZone = 'America/Sao_Paulo'
    const warehouseItemId = await warehouseItemRepository.insert(WarehouseItemMother.createCamera())
    const orderInput = {
        cpf: CpfMother.createOfRubens(),
        items: [{ warehouseItemId, quantity: 10 }]
    }
    const stubbedOrderRepository = Sinon.stub(orderRepository)
    const placeOrderUseCase = new PlaceOrderUseCase(stubbedOrderRepository, warehouseItemRepository)
    // Act
    await placeOrderUseCase.execute(orderInput)
    // Assert
    expect(stubbedOrderRepository.save.calledOnce).toBeTruthy()
    const actualInsertedValue = stubbedOrderRepository.save.getCall(0).args[0]
    expect(actualInsertedValue).toBeInstanceOf(Order);
    expect(DateTime.now().toUTC().diff(actualInsertedValue.createdAt).milliseconds).toBeLessThan(5000)
})