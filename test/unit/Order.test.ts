import { DateTime } from 'luxon';
import WarehouseItemMother from '../object-mother/WarehouseItemMother';
import Decimal from 'decimal.js';
import Sinon from 'sinon';
import FreightMother from '../object-mother/FreightMother';
import DateTimeMother from '../object-mother/DateTimeMother';
import OrderMother from '../object-mother/OrderMother';
import Coupon from '../../src/domain/entity/Coupon';
import OrderItem from '../../src/domain/entity/OrderItem';
import Order from '../../src/domain/entity/Order';

const VALID_CPF: string = '80700816003';
const WAREHOUSE_CAMERA = WarehouseItemMother.createCamera();
const DOUGLAS_BIRTHDAY = DateTimeMother.createDouglasBirthday();

afterEach(() => {
    Sinon.restore();
})

test('Should create when all parameters are valid', () => {
    const item1 = new OrderItem(WAREHOUSE_CAMERA, new Decimal(12.5), 1);
    const item2 = new OrderItem(WAREHOUSE_CAMERA, new Decimal(15), 23);
    const item3 = new OrderItem(WAREHOUSE_CAMERA, new Decimal(1.33), 11);
    expect(() => new Order(123, DOUGLAS_BIRTHDAY, VALID_CPF, [item1, item2, item3])).not.toThrow();
})

test('Should throw error when CPF is invalid', () => {
    const item1 = new OrderItem(WAREHOUSE_CAMERA, new Decimal(12.5), 1);
    expect(() => new Order(123, DOUGLAS_BIRTHDAY, '11122211112', [item1])).toThrowError();
})

test('Should throw error when there is no item', () => {
    expect(() => new Order(123, DOUGLAS_BIRTHDAY, VALID_CPF, [])).toThrowError('Order must have at least one item');
})

test('Should have price 300 when there is a total of 100 in items and freight is 200', () => {
    const item1 = new OrderItem(WAREHOUSE_CAMERA, new Decimal(25), 2);
    const item2 = new OrderItem(WAREHOUSE_CAMERA, new Decimal(50), 1);
    const freight = Sinon.stub(FreightMother.createTenCamerasFromDouglasToRubens());
    const order = new Order(123, DOUGLAS_BIRTHDAY, VALID_CPF, [item1, item2]);
    freight.calculatePrice.returns(new Decimal(200))
    expect(order.calculateTotalPrice(freight)).toStrictEqual(new Decimal(300));
})

test('Should have price 80 when total is 110 and there is a coupon for 30%', () => {
    const item1 = new OrderItem(WAREHOUSE_CAMERA, new Decimal(50), 1);
    const item2 = new OrderItem(WAREHOUSE_CAMERA, new Decimal(50), 1);
    const coupon = new Coupon('d1', new Decimal('0.3'), DateTime.fromISO('2022-01-01'));
    const freight = Sinon.stub(FreightMother.createTenCamerasFromDouglasToRubens());
    const order = new Order(123, DOUGLAS_BIRTHDAY, VALID_CPF, [item1, item2]);
    freight.calculatePrice.returns(new Decimal(10))
    expect(order.calculateTotalPrice(freight, coupon)).toStrictEqual(new Decimal(80));
})

test('Should have 202200000001 when created in 2022 and database id is 1', () => {
    const order = OrderMother.createRubensOrder();
    expect(order.code).toBe('202200000001')
})

test('Should be different instance when deep cloning', () => {
    const order = OrderMother.createRubensOrder();
    expect(order.cloneDeep() == order).toBeFalsy()
})

test('Should change id when deep cloning with payload of different id', () => {
    const order = OrderMother.createRubensOrder();
    const payload = {
        id: 999
    }
    const copy = order.cloneDeep(payload);
    expect(copy.sequentialId).toBe(999)
})