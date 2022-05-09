import { OrderItem } from '../src/OrderItem';
import { Order } from '../src/Order';
import Coupon from '../src/Coupon';
import { fake } from 'sinon';

const VALID_CPF = '80700816003';

test('Should throw error when CPF is invalid', () => {
    expect(() => new Order('11122211112', [])).toThrowError();
})

test('Should create when all parameters are valid', () => {
    const item1 = new OrderItem(12.5, 1, 'Item One');
    const item2 = new OrderItem(15, 23, 'Item Two');
    const item3 = new OrderItem(1.33, 11, 'Item Three');
    expect(() => new Order(VALID_CPF, [item1, item2, item3])).not.toThrowError();
})

test('Should have price equal to sum of all item when there is no coupon', () => {
    const item1 = new OrderItem(15, 2, 'Item 1');
    const item2 = new OrderItem(2, 1, 'Item 2');
    const order = new Order(VALID_CPF, [item1, item2]);
    expect(order.price).toBe(32);
})

test('Should have price 70 when total is 100 and there is a coupon for 30%', () => {
    const item1 = new OrderItem(50, 1, 'Item 1');
    const item2 = new OrderItem(50, 1, 'Item 2');
    const order = new Order(VALID_CPF, [item1, item2], new Coupon('d30', 0.3));
    expect(order.price).toBe(70);
})