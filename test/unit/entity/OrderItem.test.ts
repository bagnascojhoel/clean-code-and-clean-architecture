
import OrderItem from '../../../src/domain/entity/order/OrderItem';

test('Should create with success when all parameters are valid', () => {
    expect(() => new OrderItem(123, 123)).not.toThrowError();
});

test('Should throw error when quantity is zero', () => {
    expect(() => new OrderItem(123, 0)).toThrowError('Quantity cannot be zero or negative');
});

test('Should throw error when quantity is negative', () => {
    expect(() => new OrderItem(123, -123)).toThrowError('Quantity cannot be zero or negative');
});