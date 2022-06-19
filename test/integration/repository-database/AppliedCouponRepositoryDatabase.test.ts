import Decimal from "decimal.js"
import Sinon from "sinon"
import AppliedCoupon from "../../../src/domain/entity/AppliedCoupon"
import Coupon from "../../../src/domain/entity/Coupon"
import DatabaseConnectionKnexAdapter from "../../../src/infra/database/DatabaseConnectionKnexAdapter"
import AppliedCouponRepositoryDatabase from "../../../src/infra/repository-database/AppliedCouponRepositoryDatabase"
import CouponRepositoryDatabase from "../../../src/infra/repository-database/CouponRepositoryDatabase"
import OrderRepositoryDatabase from "../../../src/infra/repository-database/OrderRepositoryDatabase"
import CouponMother from "../../object-mother/CouponMother"
import DateTimeMother from "../../object-mother/DateTimeMother"
import OrderMother from "../../object-mother/OrderMother"

const connection = new DatabaseConnectionKnexAdapter()
const orderRepository = new OrderRepositoryDatabase(connection)
const couponRepository = new CouponRepositoryDatabase(connection)
const appliedCouponRepository = new AppliedCouponRepositoryDatabase(connection)

afterEach(async () => {
    Sinon.restore()
    await Promise.all([
        connection.clear('applied_coupon'),
        connection.clear('coupon'),
        connection.clear('order'),
    ])
})

afterAll(async () => connection.destroyConnection())

it('Should throw when coupon does not exist on database', async () => {
    expect.assertions(1)
    const coupon = CouponMother.create12Off()
    const order = OrderMother.createRubensOrder()
    await orderRepository.save(order)
    const appliedCoupon = new AppliedCoupon(coupon, order)
    try {
        await appliedCouponRepository.insert(appliedCoupon)
    } catch (e) {
        expect(e).toBe('Cannot apply non existing coupon')
    }
})

it('Should insert applied coupon', async () => {
    const coupon = CouponMother.create12Off()
    await couponRepository.insert(coupon)
    const order = OrderMother.createRubensOrder()
    await orderRepository.save(order)
    const appliedCoupon = new AppliedCoupon(coupon, order)
    const spiedQuery = Sinon.spy(connection, 'query')
    await appliedCouponRepository.insert(appliedCoupon)
    expect(spiedQuery.calledTwice).toBeTruthy()
    expect(spiedQuery.withArgs(Sinon.match.any, [Sinon.match.number, order.code.sequentialId]).calledOnce).toBeTruthy()
    spiedQuery.restore()
})