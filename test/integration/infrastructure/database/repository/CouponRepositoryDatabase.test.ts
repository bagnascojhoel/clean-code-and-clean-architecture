import Decimal from "decimal.js"
import Sinon from "sinon"
import Coupon from "../../../../../src/domain/entity/Coupon"
import DatabaseConnectionKnexAdapter from "../../../../../src/infrastructure/database/DatabaseConnectionKnexAdapter"
import CouponRepositoryDatabase from "../../../../../src/infrastructure/database/repository/CouponRepositoryDatabase"
import DateTimeMother from "../../../../object-mother/DateTimeMother"
import cleanUpDatabase from "../../../cleanUpDatabase"

const connection = new DatabaseConnectionKnexAdapter()
const couponRepository = new CouponRepositoryDatabase(connection)

afterEach(async () => {
    Sinon.restore()
    await cleanUpDatabase(connection)
})

afterAll(async () => connection.destroyConnection())

test('Should insert coupon', async () => {
    const coupon = new Coupon('12OFF', new Decimal(0.12), DateTimeMother.createDouglasBirthdayAt2022())
    const spiedQueryMethod = Sinon.spy(connection, 'query')
    await couponRepository.insert(coupon)
    expect(spiedQueryMethod.calledOnce).toBeTruthy()
    spiedQueryMethod.restore()
})

test('Should get one coupon of given name', async () => {
    const couponName = '12off'
    const coupon = new Coupon(couponName, new Decimal(0.12), DateTimeMother.createDouglasBirthdayAt2022())
    await couponRepository.insert(coupon)
    const actual = await couponRepository.getOne(couponName)
    expect(coupon).toEqual(actual)
})

test('Should be undefined when getting an non-existent coupon', async () => {
    const couponName = '12off'
    const actual = await couponRepository.getOne(couponName)
    expect(undefined).toEqual(actual)
})