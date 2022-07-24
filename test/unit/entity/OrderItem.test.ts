
import Decimal from 'decimal.js';
import OrderItem from '../../../src/domain/entity/OrderItem';

test('Should create with success when all parameters are valid', () => {
    expect(() => new OrderItem(123, new Decimal(123.34), 123)).not.toThrowError();
});

test('Should throw error when quantity is zero', () => {
    expect(() => new OrderItem(123, new Decimal(123.34), 0)).toThrowError('Quantity cannot be zero or negative');
});

test('Should throw error when quantity is negative', () => {
    expect(() => new OrderItem(123, new Decimal(123.34), -123)).toThrowError('Quantity cannot be zero or negative');
});

test('Should throw error when price is negative', () => {
    expect(() => new OrderItem(123, new Decimal(-10), 123)).toThrowError('Paid unitary price cannot be negative');
});

test('Should return 50 when unitary price is 5 and quantity is 10', () => {
    const item = new OrderItem(123, new Decimal(5), 10);
    expect(item.totalPrice).toStrictEqual(new Decimal(50));
})