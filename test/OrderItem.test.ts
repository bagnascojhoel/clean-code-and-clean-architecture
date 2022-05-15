import OrderItem from '../src/OrderItem';
import WarehouseItemMother from './objectmothers/WarehouseItemMother';

const WAREHOUSE_ITEM = WarehouseItemMother.createGuitar();

test('Should create with success when all parameters are valid', () => {
    expect(() => new OrderItem(WAREHOUSE_ITEM, 123.34, 123)).not.toThrowError();
});

test('Should throw error when quantity is zero', () => {
    expect(() => new OrderItem(WAREHOUSE_ITEM, 123.34, 0)).toThrowError('Quantity cannot be zero or negative');
});

test('Should throw error when quantity is negative', () => {
    expect(() => new OrderItem(WAREHOUSE_ITEM, 123.34, -123)).toThrowError('Quantity cannot be zero or negative');
});

test('Should throw error when price is negative', () => {
    expect(() => new OrderItem(WAREHOUSE_ITEM, -10, 123)).toThrowError('Paid unitary price cannot be negative');
});

test('Should return 50 when unitary price is 5 and quantity is 10', () => {
    const item = new OrderItem(WAREHOUSE_ITEM, 5, 10);
    expect(item.totalPrice).toBe(50);
})