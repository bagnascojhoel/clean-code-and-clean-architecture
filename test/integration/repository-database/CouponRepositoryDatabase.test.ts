import Decimal from "decimal.js"
import Sinon from "sinon"
import Coupon from "../../../src/domain/entity/Coupon"
import DatabaseConnectionKnexAdapter from "../../../src/infra/database/DatabaseConnectionKnexAdapter"
import CouponRepositoryDatabase from "../../../src/infra/repository-database/CouponRepositoryDatabase"
import DateTimeMother from "../../object-mother/DateTimeMother"

const connection = new DatabaseConnectionKnexAdapter()
const couponRepository = new CouponRepositoryDatabase(connection)

afterEach(async () => {
    Sinon.restore()
    await Promise.all([
        connection.clear('coupon')
    ])
})

afterAll(async () => connection.destroyConnection())

test('Should insert coupon', async () => {
    const coupon = new Coupon('12OFF', new Decimal(12), DateTimeMother.createDouglasBirthday())
    const spiedQueryMethod = Sinon.spy(connection, 'query')
    await couponRepository.insert(coupon)
    expect(spiedQueryMethod.calledOnce).toBeTruthy()
    spiedQueryMethod.restore()
})

test('Should get one coupon of given name', async () => {
    const couponName = '12off'
    const coupon = new Coupon(couponName, new Decimal(12), DateTimeMother.createDouglasBirthday())
    await couponRepository.insert(coupon)
    const actual = await couponRepository.getOne(couponName)
    expect(actual).toEqual(coupon)
})