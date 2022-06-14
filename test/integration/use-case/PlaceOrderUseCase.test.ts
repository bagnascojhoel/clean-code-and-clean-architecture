import { DateTime, Settings } from "luxon";
import Sinon from "sinon";
import PlaceOrderUseCase, { Input } from "../../../src/application/use-case/PlaceOrderUseCase";
import Order from "../../../src/domain/entity/Order";
import DatabaseConnectionKnexAdapter from "../../../src/infra/database/DatabaseConnectionKnexAdapter";
import CouponRepositoryDatabase from "../../../src/infra/repository-database/CouponRepositoryDatabase";
import OrderRepositoryDatabase from "../../../src/infra/repository-database/OrderRepositoryDatabase";
import WarehouseItemRepositoryDatabase from "../../../src/infra/repository-database/WarehouseItemRepositoryDatabase";
import CpfMother from "../../object-mother/CpfMother";
import WarehouseItemMother from "../../object-mother/WarehouseItemMother";

const connection = new DatabaseConnectionKnexAdapter()
const warehouseItemRepository = new WarehouseItemRepositoryDatabase(connection)
const orderRepository = new OrderRepositoryDatabase(connection)
const couponRepository = new CouponRepositoryDatabase(connection)

afterEach(() => {
    Sinon.restore()
    return Promise.all([
        connection.clear('order_item'),
        connection.clear('order'),
        connection.clear('warehouse_item'),
    ])
})

it('Should save order when placing it', async () => {
    const warehouseItemId = await warehouseItemRepository.insert(WarehouseItemMother.createCamera())
    const orderContent = {
        cpf: CpfMother.createOfRubens(),
        items: [{ warehouseItemId, quantity: 10 }]
    }
    const stubbedOrderRepository = Sinon.stub(orderRepository)
    const placeOrderUseCase = new PlaceOrderUseCase(stubbedOrderRepository, warehouseItemRepository, couponRepository)
    const actualOrderCode = await placeOrderUseCase.execute(orderContent)
    expect(actualOrderCode).toBeDefined()
    expect(stubbedOrderRepository.save.called).toBeTruthy()
    const persistedOrder = stubbedOrderRepository.save.getCall(0).args[0]
    expect(persistedOrder).toBeTruthy()
    expect(persistedOrder?.cpf?.value).toBe(orderContent.cpf)
    expect(persistedOrder?.items.length).toBe(1)
    expect(persistedOrder?.items[0].quantity()).toBe(10)
    expect(persistedOrder?.items[0].warehouseItem.id).toBe(warehouseItemId)
})

// TODO Fix this test
it.skip('Should save coupon when placing order with coupon', async () => {
    const warehouseItemId = await warehouseItemRepository.insert(WarehouseItemMother.createCamera())
    const orderContent: Input = {
        cpf: CpfMother.createOfRubens(),
        items: [{ warehouseItemId, quantity: 10 }],
        coupon: '12OFF'
    }
    const stubbedOrderRepository = Sinon.stub(orderRepository)
    const stubbedCouponRepository = Sinon.stub(couponRepository)
    const placeOrderUseCase = new PlaceOrderUseCase(stubbedOrderRepository, warehouseItemRepository, couponRepository)
    await placeOrderUseCase.execute(orderContent)
    expect(stubbedOrderRepository.save.called).toBeTruthy()
    expect(stubbedCouponRepository.save.called).toBeTruthy()
    expect(stubbedCouponRepository.save.getCall(0).args[0].name).toBe(orderContent.coupon)
})