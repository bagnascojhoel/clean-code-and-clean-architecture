import { DateTime } from "luxon";
import Coupon from "../src/Coupon";

test('Should throw error when discount percentage is negative', () => {
    expect(() => new Coupon('d-1', -1, DateTime.now())).toThrowError('Coupon cannot be negative');
})

test('Should throw error when identifier is empty', () => {
    expect(() => new Coupon('', .52, DateTime.now())).toThrowError('Coupon must have a non-empty identifier');
})

test('Should throw error when expiration date is yesterday', () => {
    const yesterday = DateTime.now().minus({ day: 1 });
    expect(() => new Coupon('d20', .2, yesterday)).toThrowError('Coupon is expired')
})

test.only('Should not throw when expiration date is today', () => {
    const today = DateTime.now();
    expect(() => new Coupon('d20', .2, today)).not.toThrowError('Coupon is expired')
})

test.only('Should not throw when expiration date is tomorrow', () => {
    const tomorrow = DateTime.now().plus({ days: 1 });
    expect(() => new Coupon('d20', .2, tomorrow)).not.toThrowError('Coupon is expired')
})