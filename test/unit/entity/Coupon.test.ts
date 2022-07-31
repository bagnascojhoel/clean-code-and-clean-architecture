import Decimal from "decimal.js";
import { DateTime } from "luxon";
import Coupon from "../../../src/domain/entity/Coupon";
import DateTimeMother from "../../object-mother/DateTimeMother";

const THIRTY_PERCENT_DISCOUNT = new Decimal(0.3);
describe('Domain > Entity > Coupon', () => {
    it('Should throw error when discount percentage is negative', () => {
        expect(() => new Coupon('d-1', new Decimal(-1), DateTimeMother.createDouglasBirthdayAt2022())).toThrow('Coupon cannot have negative discount');
    })

    it('Should throw when discount is greater or equal to 1', () => {
        expect(() => new Coupon('D1', new Decimal(1), DateTimeMother.createDouglasBirthdayAt2022()))
            .toThrow('Coupon cannot have discount greater or equal to 100% (1)')
    })

    it('Should throw error when identifier is empty', () => {
        expect(() => new Coupon('', THIRTY_PERCENT_DISCOUNT, DateTimeMother.createDouglasBirthdayAt2022())).toThrow('Coupon must have a non-empty identifier');
    })

    it('Should be true when expiration date is yesterday', () => {
        const expirationDate = DateTime.fromISO('2022-01-04')
        const coupon = new Coupon('d20', THIRTY_PERCENT_DISCOUNT, expirationDate)
        const today = DateTime.fromISO('2022-01-05')
        expect(coupon.hasExpired(today)).toBe(true)
    })

    it('Should be false when expiration date is tomorrow', () => {
        const expirationDate = DateTime.fromISO('2022-01-05')
        const coupon = new Coupon('d20', THIRTY_PERCENT_DISCOUNT, expirationDate)
        const today = DateTime.fromISO('2022-01-04')
        expect(coupon.hasExpired(today)).toBe(false)
    })

    it('Should be false when expiration date is today but later in the day', () => {
        const todayAt10 = DateTime.fromISO('2022-01-04T10:00:00')
        const coupon = new Coupon('d20', THIRTY_PERCENT_DISCOUNT, todayAt10)
        const todayAt2 = DateTime.fromISO('2022-01-04T02:00:00')
        expect(coupon.hasExpired(todayAt2)).toBe(false)
    })

    it('Should be true when expiration date is today to hours ago', () => {
        const expirationDate = DateTime.fromISO('2022-01-05T10:00:00')
        const coupon = new Coupon('d20', THIRTY_PERCENT_DISCOUNT, expirationDate)
        const rightNow = DateTime.fromISO('2022-01-05T12:00:00')
        expect(coupon.hasExpired(rightNow)).toBe(true)
    })

    it('Should be 30 when valid and for 30% on $100', () => {
        const expirationDate = DateTime.fromISO('2022-01-05')
        const coupon = new Coupon('d20', THIRTY_PERCENT_DISCOUNT, expirationDate)
        const appliedAt = DateTimeMother.createDouglasBirthdayAt2022();
        expect(coupon.calculateDiscount(appliedAt, new Decimal(100))).toStrictEqual(new Decimal(30))
    })

    it('Should be 70 when calculating discounted price', () => {
        const expirationDate = DateTime.fromISO('2022-01-05')
        const coupon = new Coupon('d20', THIRTY_PERCENT_DISCOUNT, expirationDate)
        const appliedAt = DateTimeMother.createDouglasBirthdayAt2022();
        expect(coupon.calculateDiscountedPrice(appliedAt, new Decimal(100))).toStrictEqual(new Decimal(70))
    })
})