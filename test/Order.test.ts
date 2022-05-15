import OrderItem from '../src/OrderItem';
import Order from '../src/Order';
import Coupon from '../src/Coupon';
import { DateTime } from 'luxon';
import WarehouseItemMother from './objectmothers/WarehouseItemMother';
import Decimal from 'decimal.js';
import Sinon from 'sinon';
import FreightMother from './objectmothers/FreightMother';

const VALID_CPF: string = '80700816003';
const WAREHOUSE_CAMERA = WarehouseItemMother.createCamera();
const FREIGHT = FreightMother.createTenCamerasFromDouglasToRubens();
const COUPON: Coupon = new Coupon('MYCOUPON', 0.2, DateTime.now().plus(1));

afterEach(() => {
    Sinon.restore();
})

test('Should throw error when CPF is invalid', () => {
    expect(() => new Order('11122211112', FREIGHT, [])).toThrowError();
})

test('Should throw error when there is no item', () => {
    expect(() => new Order(VALID_CPF, FREIGHT, [], COUPON)).toThrowError('Order must have at least one item');
})

test('Should create when all parameters are valid', () => {
    const item1 = new OrderItem(WAREHOUSE_CAMERA, 12.5, 1);
    const item2 = new OrderItem(WAREHOUSE_CAMERA, 15, 23);
    const item3 = new OrderItem(WAREHOUSE_CAMERA, 1.33, 11);
    expect(() => new Order(VALID_CPF, FREIGHT, [item1, item2, item3], COUPON)).not.toThrow();
})

test('Should have price 300 when there is a total of 100 in items and freight is 200', () => {
    const item1 = new OrderItem(WAREHOUSE_CAMERA, 25, 2);
    const item2 = new OrderItem(WAREHOUSE_CAMERA, 50, 1);
    const freight = Sinon.stub(FREIGHT);
    const order = new Order(VALID_CPF, freight, [item1, item2]);
    freight.calculatePrice.returns(new Decimal(200))
    expect(order.calculateTotalPrice()).toStrictEqual(new Decimal(300));
})

test('Should have price 80 when total is 110 and there is a coupon for 30%', () => {
    const item1 = new OrderItem(WAREHOUSE_CAMERA, 50, 1);
    const item2 = new OrderItem(WAREHOUSE_CAMERA, 50, 1);
    const coupon = new Coupon('d1', .3, DateTime.now().plus({ days: 1 }));
    const freight = Sinon.stub(FREIGHT);
    const order = new Order(VALID_CPF, freight, [item1, item2], coupon);
    freight.calculatePrice.returns(new Decimal(10))
    expect(order.calculateTotalPrice()).toStrictEqual(new Decimal(80));
})
