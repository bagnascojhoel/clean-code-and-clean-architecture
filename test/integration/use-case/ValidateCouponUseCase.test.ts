import Decimal from "decimal.js";
import { DateTime, Duration } from "luxon";
import Sinon from "sinon";
import ValidateCouponUseCase from "../../../src/application/use-case/ValidateCouponUseCase";
import Coupon from "../../../src/domain/entity/Coupon";
import DatabaseConnectionKnexAdapter from "../../../src/infra/database/DatabaseConnectionKnexAdapter";
import CouponRepositoryDatabase from "../../../src/infra/repository-database/CouponRepositoryDatabase";
import cleanUpDatabase from "../cleanUpDatabase";

const connection = new DatabaseConnectionKnexAdapter()
const couponRepository = new CouponRepositoryDatabase(connection)
const validateCouponUseCase = new ValidateCouponUseCase(couponRepository)

afterEach(async () => {
    Sinon.restore()
    await cleanUpDatabase(connection)
})

afterAll(() => {
    connection.destroyConnection();
})

it('Should be true when valid coupon exists', async () => {
    const coupon = new Coupon('MYCOUPON', new Decimal(50), DateTime.now())
    await couponRepository.insert(coupon)
    const output = await validateCouponUseCase.execute(coupon.name);
    expect(output).toBeTruthy()
})

it('Should be false when coupon exists but is expired', async () => {
    const coupon = new Coupon('MYCOUPON', new Decimal(10), DateTime.now().minus(Duration.fromObject({ day: 1 })))
    await couponRepository.insert(coupon)
    const output = await validateCouponUseCase.execute(coupon.name)
    expect(output).toBeFalsy()
})

it('Should be false when coupon does not exist', async () => {
    const output = await validateCouponUseCase.execute('MYCOUPON')
    expect(output).toBeFalsy()
})