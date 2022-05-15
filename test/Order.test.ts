import OrderItem from '../src/OrderItem';
import Order from '../src/Order';
import Coupon from '../src/Coupon';
import { DateTime } from 'luxon';
import WarehouseItemMother from './objectmothers/WarehouseItemMother';
import Address from '../src/Address';

const VALID_CPF: string = '80700816003';
const WAREHOUSE_ITEM = WarehouseItemMother.createGuitar();
const DESTINATION = new Address();
const COUPON: Coupon = new Coupon('MYCOUPON', 0.2, DateTime.now().plus(1));

test('Should throw error when CPF is invalid', () => {
    expect(() => new Order('11122211112', DESTINATION, [])).toThrowError();
})

test('Should throw error when there is no item', () => {
    expect(() => new Order(VALID_CPF, DESTINATION, [], COUPON)).toThrowError('Order must have at least one item');
})

test('Should create when all parameters are valid', () => {
    const item1 = new OrderItem(WAREHOUSE_ITEM, 12.5, 1);
    const item2 = new OrderItem(WAREHOUSE_ITEM, 15, 23);
    const item3 = new OrderItem(WAREHOUSE_ITEM, 1.33, 11);
    expect(() => new Order(VALID_CPF, DESTINATION, [item1, item2, item3], COUPON)).not.toThrow();
})

test('Should have price equal to sum of all item when there is no coupon', () => {
    const item1 = new OrderItem(WAREHOUSE_ITEM, 15, 2);
    const item2 = new OrderItem(WAREHOUSE_ITEM, 2, 1);
    const order = new Order(VALID_CPF, DESTINATION, [item1, item2]);
    expect(order.price).toBe(32);
})

test('Should have price 70 when total is 100 and there is a coupon for 30%', () => {
    const item1 = new OrderItem(WAREHOUSE_ITEM, 50, 1);
    const item2 = new OrderItem(WAREHOUSE_ITEM, 50, 1);
    const coupon = new Coupon('d1', .3, DateTime.now().plus({ days: 1 }));
    const order = new Order(VALID_CPF, DESTINATION, [item1, item2], coupon);
    expect(order.price).toBe(70);
})

// test('Should work', () => {
//     const warehouseItem1 = WarehouseItemMother.createGuitar();
//     const item1 = new OrderItem(WAREHOUSE_ITEM, 50, 1);
//     const item2 = new OrderItem(WAREHOUSE_ITEM, 50, 1);
//     const order = new Order(VALID_CPF, DESTINATION, [item1, item2]);
//     expect(() => )
// })