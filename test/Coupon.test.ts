import Coupon from "../src/Coupon";

test('Should throw error when discount percentage is negative', () => {
    expect(() => new Coupon('d-1', -1)).toThrowError('Coupon cannot be negative');
})

test('Should throw error when identifier is empty', () => {
    expect(() => new Coupon('', .52)).toThrowError('Coupon must have a non-empty identifier');
})