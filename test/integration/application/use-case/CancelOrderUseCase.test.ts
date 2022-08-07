import Sinon from "sinon"
import CancelOrderUseCase from "../../../../src/application/use-case/CancellOrderUseCase"
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
const cancelOrderUseCase = new CancelOrderUseCase(repoFactory)
const fakePresenter = {
    onSuccess: () => { },
    onNotFound: () => { }
}
let orderCode: OrderCode

describe('Infrastructure > UseCase > CancelOrderUseCase', () => {
    beforeEach(async () => {
        const placeOrderUseCase = new PlaceOrderUseCase(repoFactory)
        const warehouseItem = WarehouseItemMother.createCamera()
        await warehouseItemRepository.save(warehouseItem)
        const placeOrderInput = { cpf: CpfMother.createOfRubens(), items: [{ warehouseItemId: warehouseItem.id, quantity: 1 }] }
        orderCode = await placeOrderUseCase.execute(placeOrderInput)
    })
    afterEach(async () => {
        Sinon.restore()
        await cleanUpDatabase(connection)
    })

    afterAll(async () => connection.destroyConnection())

    it('Should be not found when order does not exists', async () => {
        const spiedFakePresenter = Sinon.spy(fakePresenter)
        await cancelOrderUseCase.execute({ orderCode: OrderCode.fromValue('ABC123') }, spiedFakePresenter)
        expect(spiedFakePresenter.onSuccess.called).toBeFalsy()
        expect(spiedFakePresenter.onNotFound.calledOnce).toBeTruthy()
    })

    it('Should be success when order exists', async () => {
        const spiedFakePresenter = Sinon.spy(fakePresenter)
        await cancelOrderUseCase.execute({ orderCode }, spiedFakePresenter)
        expect(spiedFakePresenter.onSuccess.calledOnce).toBeTruthy()
        expect(spiedFakePresenter.onNotFound.called).toBeFalsy()
    })

    it('Should save cancelled order', async () => {
        await cancelOrderUseCase.execute({ orderCode }, fakePresenter)
        const orderRepository = repoFactory.createForOrder()
        const order = await orderRepository.findOne(orderCode)
        expect(order?.cancelledAt).toBeDefined()
        expect(order?.cancelledAt?.diffNow().as('minutes')).toBeLessThanOrEqual(2)
    })
})
