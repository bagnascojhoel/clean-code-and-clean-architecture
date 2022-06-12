import Decimal from "decimal.js";
import Sinon from "sinon";
import Order from "../../../src/domain/entity/Order";
import OrderCode from "../../../src/domain/entity/OrderCode";
import OrderItem from "../../../src/domain/entity/OrderItem";
import DatabaseConnectionKnexAdapter from "../../../src/infra/database/DatabaseConnectionKnexAdapter";
import OrderRepositoryDatabase from "../../../src/infra/repository-database/OrderRepositoryDatabase"
import WarehouseItemRepositoryDatabase from "../../../src/infra/repository-database/WarehouseItemRepositoryDatabase";
import CpfMother from "../../object-mother/CpfMother";
import DateTimeMother from "../../object-mother/DateTimeMother";
import OrderMother from "../../object-mother/OrderMother";
import WarehouseItemMother from "../../object-mother/WarehouseItemMother";

const connection = new DatabaseConnectionKnexAdapter()
const repository = new OrderRepositoryDatabase(connection)

afterEach(() => {
    Sinon.restore()
    return Promise.all([
        connection.clear('order_item'),
        connection.clear('order'),
        connection.clear('warehouse_item'),
    ])
})

it('Should be order code when saving an order', async () => {
    const order = OrderMother.createRubensOrder()
    const actual = await repository.save(order)
    expect(actual).toBe(order.code)
})

it('Should query connection with correct amount of values when inserting value', async () => {
    const stubbedConnection = Sinon.stub(connection)
    const injectedRepository = new OrderRepositoryDatabase(stubbedConnection)
    stubbedConnection.query.returns(Promise.resolve([{ total: 1 }]))
    await injectedRepository.save(OrderMother.createRubensOrder())
    expect(stubbedConnection.query.called).toBeTruthy()
})

it('Should return the total quantity of registries', async () => {
    await repository.save(OrderMother.createRubensOrder())
    const actual = await repository.count()
    expect(actual).toBeGreaterThanOrEqual(1)
})

it('Should query connection when counting', async () => {
    await repository.save(OrderMother.createRubensOrder())
    const stubbedConnection = Sinon.stub(connection)
    const injectedRepository = new OrderRepositoryDatabase(stubbedConnection)
    stubbedConnection.query.returns(Promise.resolve([{ total: 1 }]))
    await injectedRepository.count()
    expect(stubbedConnection.query.called).toBeTruthy()
})

it('Should find order by order code', async () => {
    const warehouseItemRepository = new WarehouseItemRepositoryDatabase(connection)
    const warehouseItem = WarehouseItemMother.createCamera()
    await warehouseItemRepository.insert(warehouseItem)
    const order = new Order(
        new OrderCode(1, 2000),
        DateTimeMother.createDouglasBirthday(),
        CpfMother.createOfRubens(),
        [new OrderItem(warehouseItem, new Decimal(10), 12)]
    )
    const orderCode = await repository.save(order)
    const actual = await repository.findOne(orderCode)
    expect(actual).toEqual(order)
})

it('Should be null when finding non-existing order', async () => {
    const actual = await repository.findOne(new OrderCode(1, 1000))
    expect(actual).toBeNull()
})

it('Should save with ISO creation', async () => {
    const ORDER_INSERT_CALL_INDEX = 0
    const PARAMETERS_INDEX = 1
    const CREATED_AT_FIELD_INDEX = 3
    const stubbedConnection = Sinon.stub(new DatabaseConnectionKnexAdapter())
    const repository = new OrderRepositoryDatabase(stubbedConnection)
    const order = OrderMother.createRubensOrder()
    await repository.save(order)
    expect(stubbedConnection.query.called).toBeTruthy()
    expect(stubbedConnection.query.args[ORDER_INSERT_CALL_INDEX][PARAMETERS_INDEX][CREATED_AT_FIELD_INDEX])
        .toBe(order.createdAt.toISO())
})