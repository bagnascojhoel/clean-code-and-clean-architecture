import { OrderItem } from '../src/OrderItem';

test('Should create with success when all parameters are valid', () => {
    expect(() => new OrderItem(123.34, 123, 'description')).not.toThrowError();
});

test('Should throw error when quantity is zero', () => {
    expect(() => new OrderItem(123.34, 0, 'description')).toThrowError('Quantity cannot be zero or negative');
});

test('Should throw error when quantity is negative', () => {
    expect(() => new OrderItem(123.34, -123, 'description')).toThrowError('Quantity cannot be zero or negative');
});

test('Should throw error when price is zero', () => {
    expect(() => new OrderItem(0, 123, 'description')).toThrowError('Price cannot be zero or negative');
});

test('Should throw error when price is negative', () => {
    expect(() => new OrderItem(-10, 123, 'description')).toThrowError('Price cannot be zero or negative');
});

test('Should return 50 when unitary price is 5 and quantity is 10', () => {
    const item = new OrderItem(5, 10, 'item');
    expect(item.totalPrice).toBe(50);
})