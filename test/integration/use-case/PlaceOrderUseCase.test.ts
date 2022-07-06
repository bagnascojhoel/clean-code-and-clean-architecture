import Sinon from "sinon";
import PlaceOrderUseCase, { Input } from "../../../src/application/use-case/PlaceOrderUseCase";
import DatabaseConnectionKnexAdapter from "../../../src/infra/database/DatabaseConnectionKnexAdapter";
import AppliedCouponRepositoryDatabase from "../../../src/infra/repository-database/AppliedCouponRepositoryDatabase";
import CouponRepositoryDatabase from "../../../src/infra/repository-database/CouponRepositoryDatabase";
import OrderRepositoryDatabase from "../../../src/infra/repository-database/OrderRepositoryDatabase";
import WarehouseItemRepositoryDatabase from "../../../src/infra/repository-database/WarehouseItemRepositoryDatabase";
import CouponMother from '../../object-mother/CouponMother';
import CpfMother from "../../object-mother/CpfMother";
import WarehouseItemMother from "../../object-mother/WarehouseItemMother";
import cleanUpDatabase from "../cleanUpDatabase";

const connection = new DatabaseConnectionKnexAdapter()
const warehouseItemRepository = new WarehouseItemRepositoryDatabase(connection)
const orderRepository = new OrderRepositoryDatabase(connection)
const couponRepository = new CouponRepositoryDatabase(connection);
const appliedCouponRepository = new AppliedCouponRepositoryDatabase(connection)
const placeOrderUseCase = new PlaceOrderUseCase(
    orderRepository,
    warehouseItemRepository,
    couponRepository,
    appliedCouponRepository,
)

afterEach(async () => {
    Sinon.restore()
    await cleanUpDatabase(connection)
})

afterAll(async () => connection.destroyConnection())

it('Should throw error when placing order with unknown warehouse item', () => {
    const orderContent = {
        cpf: CpfMother.createOfRubens(),
        items: [{ warehouseItemId: 999, quantity: 10 }]
    }
    expect(async () => await placeOrderUseCase.execute(orderContent)).rejects.toEqual('Warehouse item does not exist')
})

it('Should throw error when placing order with non-existent coupon', async () => {
    const warehouseItemId = await warehouseItemRepository.insert(WarehouseItemMother.createCamera())
    const orderContent = {
        cpf: CpfMother.createOfRubens(),
        items: [{ warehouseItemId, quantity: 10 }],
        coupon: 'MYCOUPON'
    }
    expect(async () => await placeOrderUseCase.execute(orderContent)).rejects.toEqual('Coupon does not exist')
})

it('Should save coupon when placing order with one', async () => {
    const warehouseItemId = await warehouseItemRepository.insert(WarehouseItemMother.createCamera())
    const coupon = CouponMother.create12Off()
    await couponRepository.insert(coupon)
    const orderContent: Input = {
        cpf: CpfMother.createOfRubens(),
        items: [{ warehouseItemId, quantity: 10 }],
        coupon: coupon.name
    }
    const spiedOrderSave = Sinon.spy(orderRepository, 'save')
    const spiedAppliedCouponInsert = Sinon.spy(appliedCouponRepository, 'insert')
    await placeOrderUseCase.execute(orderContent)
    expect(spiedOrderSave.calledOnce).toBeTruthy()
    expect(spiedAppliedCouponInsert.calledOnce).toBeTruthy()
    expect(spiedAppliedCouponInsert.withArgs(Sinon.match.has('coupon', coupon)).calledOnce).toBeTruthy()
    spiedOrderSave.restore()
    spiedAppliedCouponInsert.restore()
})