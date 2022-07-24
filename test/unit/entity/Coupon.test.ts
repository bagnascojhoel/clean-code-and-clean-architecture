import Decimal from "decimal.js";
import { DateTime } from "luxon";
import Coupon from "../../../src/domain/entity/Coupon";
import DateTimeMother from "../../object-mother/DateTimeMother";

const THIRTY_PERCENT_DISCOUNT = new Decimal(0.3);
test('Should throw error when discount percentage is negative', () => {
    expect(() => new Coupon('d-1', new Decimal(-1), DateTime.now())).toThrowError('Coupon cannot be negative');
})

test('Should throw error when identifier is empty', () => {
    expect(() => new Coupon('', THIRTY_PERCENT_DISCOUNT, DateTime.now())).toThrowError('Coupon must have a non-empty identifier');
})

test('Should be true when expiration date is yesterday', () => {
    const expirationDate = DateTime.fromISO('2022-01-04')
    const coupon = new Coupon('d20', THIRTY_PERCENT_DISCOUNT, expirationDate)
    const today = DateTime.fromISO('2022-01-05')
    expect(coupon.hasExpired(today)).toBe(true)
})

test('Should be false when expiration date is tomorrow', () => {
    const expirationDate = DateTime.fromISO('2022-01-05')
    const coupon = new Coupon('d20', THIRTY_PERCENT_DISCOUNT, expirationDate)
    const today = DateTime.fromISO('2022-01-04')
    expect(coupon.hasExpired(today)).toBe(false)
})

test('Should be false when expiration date is today but later in the day', () => {
    const todayAt10 = DateTime.fromISO('2022-01-04T10:00:00')
    const coupon = new Coupon('d20', THIRTY_PERCENT_DISCOUNT, todayAt10)
    const todayAt2 = DateTime.fromISO('2022-01-04T02:00:00')
    expect(coupon.hasExpired(todayAt2)).toBe(false)
})

test('Should be true when expiration date is today to hours ago', () => {
    const expirationDate = DateTime.fromISO('2022-01-05T10:00:00')
    const coupon = new Coupon('d20', THIRTY_PERCENT_DISCOUNT, expirationDate)
    const rightNow = DateTime.fromISO('2022-01-05T12:00:00')
    expect(coupon.hasExpired(rightNow)).toBe(true)
})

test('Should be 30 when valid and for 30% on $100', () => {
    const expirationDate = DateTime.fromISO('2022-01-05')
    const coupon = new Coupon('d20', THIRTY_PERCENT_DISCOUNT, expirationDate)
    const appliedAt = DateTimeMother.createDouglasBirthday();
    expect(coupon.calculateDiscount(appliedAt, new Decimal(100))).toStrictEqual(new Decimal(30))
})