import Sinon from "sinon";
import PlaceOrderUseCase, { Input } from "../../../src/application/use-case/PlaceOrderUseCase";
import RepositoryFactory from "../../../src/domain/factory/RepositoryFactory";
import DatabaseConnectionKnexAdapter from "../../../src/infra/database/DatabaseConnectionKnexAdapter";
import DatabaseRepositoryFactory from "../../../src/infra/repository-database/DatabaseRepositoryFactory";
import CouponMother from '../../object-mother/CouponMother';
import CpfMother from "../../object-mother/CpfMother";
import WarehouseItemMother from "../../object-mother/WarehouseItemMother";
import cleanUpDatabase from "../cleanUpDatabase";

const connection = new DatabaseConnectionKnexAdapter()
const repositoryFactory = new DatabaseRepositoryFactory(connection)
const placeOrderUseCase = new PlaceOrderUseCase(repositoryFactory)
const warehouseItemRepository = repositoryFactory.createWarehouseItemRepository()
const couponRepository = repositoryFactory.createCouponRepository()
const appliedCouponRepository = repositoryFactory.createAppliedCouponRepository()
const orderRepository = repositoryFactory.createOrderRepository()

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
    const camera = WarehouseItemMother.createCamera()
    await warehouseItemRepository.save(camera)
    const orderContent = {
        cpf: CpfMother.createOfRubens(),
        items: [{ warehouseItemId: camera.id, quantity: 10 }],
        coupon: 'MYCOUPON'
    }
    expect(async () => await placeOrderUseCase.execute(orderContent)).rejects.toEqual('Coupon does not exist')
})

it('Should save coupon when placing order with one', async () => {
    const camera = WarehouseItemMother.createCamera()
    await warehouseItemRepository.save(camera)
    const coupon = CouponMother.create12Off()
    await couponRepository.insert(coupon)
    const orderContent: Input = {
        cpf: CpfMother.createOfRubens(),
        items: [{ warehouseItemId: camera.id, quantity: 10 }],
        coupon: coupon.name
    }
    const spiedOrderSave = Sinon.spy(orderRepository, 'save')
    const spiedAppliedCouponInsert = Sinon.spy(appliedCouponRepository, 'insert')
    const fakeRepoFactory: RepositoryFactory = {
        createAppliedCouponRepository: () => appliedCouponRepository,
        createOrderRepository: () => orderRepository,
        createCouponRepository: () => couponRepository,
        createWarehouseItemRepository: () => warehouseItemRepository
    }
    const useCase = new PlaceOrderUseCase(fakeRepoFactory)
    await useCase.execute(orderContent)
    expect(spiedOrderSave.calledOnce).toBeTruthy()
    expect(spiedAppliedCouponInsert.calledOnce).toBeTruthy()
    expect(spiedAppliedCouponInsert.withArgs(Sinon.match.has('coupon', coupon)).calledOnce).toBeTruthy()
    spiedOrderSave.restore()
    spiedAppliedCouponInsert.restore()
})

it('Should reduce warehouse item quantity when placing order of an item', async () => {
    const warehouseItem = WarehouseItemMother.createCamera()
    await warehouseItemRepository.save(warehouseItem)
    const input: Input = { cpf: CpfMother.createOfRubens(), items: [{ warehouseItemId: warehouseItem.id, quantity: 5 }] }
    await placeOrderUseCase.execute(input)
    const totalStockAfterPlacingOrder = await warehouseItemRepository.findOne(warehouseItem.id)
    expect(totalStockAfterPlacingOrder?.quantityOnStock).toBe(warehouseItem.quantityOnStock - 5)
})