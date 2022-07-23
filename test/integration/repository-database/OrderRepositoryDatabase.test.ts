import Decimal from "decimal.js";
import Sinon from "sinon";
import Order from "../../../src/domain/entity/Order";
import OrderCode from "../../../src/domain/entity/OrderCode";
import OrderItem from "../../../src/domain/entity/OrderItem";
import DatabaseConnectionKnexAdapter from "../../../src/infra/database/DatabaseConnectionKnexAdapter";
import OrderRepositoryDatabase from "../../../src/infra/repository-database/OrderRepositoryDatabase";
import WarehouseItemRepositoryDatabase from "../../../src/infra/repository-database/WarehouseItemRepositoryDatabase";
import CpfMother from "../../object-mother/CpfMother";
import DateTimeMother from "../../object-mother/DateTimeMother";
import OrderMother from "../../object-mother/OrderMother";
import WarehouseItemMother from "../../object-mother/WarehouseItemMother";
import cleanUpDatabase from "../cleanUpDatabase";

const connection = new DatabaseConnectionKnexAdapter()
const orderRepository = new OrderRepositoryDatabase(connection)
const warehouseItemRepository = new WarehouseItemRepositoryDatabase(connection)

afterEach(async () => {
    Sinon.restore()
    await cleanUpDatabase(connection)
})

afterAll(async () => connection.destroyConnection())

it('Should be order code when saving an order', async () => {
    const order = OrderMother.createRubensOrder()
    const actual = await orderRepository.save(order)
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
    await orderRepository.save(OrderMother.createRubensOrder())
    const actual = await orderRepository.count()
    expect(actual).toBeGreaterThanOrEqual(1)
})

it('Should query connection when counting', async () => {
    await orderRepository.save(OrderMother.createRubensOrder())
    const stubbedConnection = Sinon.stub(connection)
    const injectedRepository = new OrderRepositoryDatabase(stubbedConnection)
    stubbedConnection.query.returns(Promise.resolve([{ total: 1 }]))
    await injectedRepository.count()
    expect(stubbedConnection.query.called).toBeTruthy()
})

it('Should find order by its code', async () => {
    const warehouseItem = WarehouseItemMother.createCamera()
    await warehouseItemRepository.insert(warehouseItem)
    const order = new Order(
        new OrderCode(1, 2000),
        DateTimeMother.createDouglasBirthday(),
        CpfMother.createOfRubens(),
        [new OrderItem(warehouseItem, new Decimal(10), 12)]
    )
    const orderCode = await orderRepository.save(order)
    const actual = await orderRepository.findOne(orderCode)
    expect(actual).toEqual(order)
})

it('Should be null when finding non-existing order', async () => {
    const actual = await orderRepository.findOne(new OrderCode(1, 1000))
    expect(actual).toBeNull()
})

it('Should save created at date as UTC in ISO format', async () => {
    const ORDER_INSERT_CALL_INDEX = 0
    const PARAMETERS_INDEX = 1
    const CREATED_AT_FIELD_INDEX = 2
    const stubbedConnection = Sinon.stub(new DatabaseConnectionKnexAdapter())
    const repository = new OrderRepositoryDatabase(stubbedConnection)
    const order = OrderMother.createRubensOrder()
    await repository.save(order)
    expect(stubbedConnection.query.called).toBeTruthy()
    expect(stubbedConnection.query.args[ORDER_INSERT_CALL_INDEX][PARAMETERS_INDEX][CREATED_AT_FIELD_INDEX])
        .toBe(order.createdAt.toUTC().toISO())
})

it('Should be all stored orders when finding all', async () => {
    await warehouseItemRepository.insert(WarehouseItemMother.createCamera())
    const order = OrderMother.createRubensOrder()
    await orderRepository.save(order)
    const actual = await orderRepository.findAll()
    expect(actual).toStrictEqual([order])
})