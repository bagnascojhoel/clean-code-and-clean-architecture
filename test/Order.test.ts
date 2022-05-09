import OrderItem from '../src/OrderItem';
import Order from '../src/Order';
import Coupon from '../src/Coupon';
import WarehouseItem from '../src/WarehouseItem';

const VALID_CPF = '80700816003';
const WAREHOUSE_ITEM = new WarehouseItem(12, 'a description', 123);

test('Should throw error when CPF is invalid', () => {
    expect(() => new Order('11122211112', [])).toThrowError();
})

test('Should create when all parameters are valid', () => {
    const item1 = new OrderItem(WAREHOUSE_ITEM, 12.5, 1);
    const item2 = new OrderItem(WAREHOUSE_ITEM, 15, 23);
    const item3 = new OrderItem(WAREHOUSE_ITEM, 1.33, 11);
    expect(() => new Order(VALID_CPF, [item1, item2, item3])).not.toThrowError();
})

test('Should have price equal to sum of all item when there is no coupon', () => {
    const item1 = new OrderItem(WAREHOUSE_ITEM, 15, 2);
    const item2 = new OrderItem(WAREHOUSE_ITEM, 2, 1);
    const order = new Order(VALID_CPF, [item1, item2]);
    expect(order.price).toBe(32);
})

test('Should have price 70 when total is 100 and there is a coupon for 30%', () => {
    const item1 = new OrderItem(WAREHOUSE_ITEM, 50, 1);
    const item2 = new OrderItem(WAREHOUSE_ITEM, 50, 1);
    const order = new Order(VALID_CPF, [item1, item2], new Coupon('d30', 0.3));
    expect(order.price).toBe(70);
})