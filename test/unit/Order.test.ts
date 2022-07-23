import Decimal from 'decimal.js';
import { DateTime } from 'luxon';
import Sinon from 'sinon';
import Coupon from '../../src/domain/entity/Coupon';
import Order from '../../src/domain/entity/Order';
import OrderCode from '../../src/domain/entity/OrderCode';
import OrderItem from '../../src/domain/entity/OrderItem';
import DateTimeMother from '../object-mother/DateTimeMother';
import FreightMother from '../object-mother/FreightMother';
import WarehouseItemMother from '../object-mother/WarehouseItemMother';

const VALID_CPF: string = '80700816003'
const WAREHOUSE_CAMERA = WarehouseItemMother.createCamera()
const WAREHOUSE_FRIDGE = WarehouseItemMother.createFridge()
const DOUGLAS_BIRTHDAY = DateTimeMother.createDouglasBirthday()
const ORDER_CODE = new OrderCode(1, 2022)

afterEach(() => {
    Sinon.restore();
})

test('Should create when all parameters are valid', () => {
    const item1 = new OrderItem(WAREHOUSE_CAMERA, new Decimal(12.5), 1);
    const item2 = new OrderItem(WAREHOUSE_FRIDGE, new Decimal(15), 23);
    expect(() => new Order(ORDER_CODE, DOUGLAS_BIRTHDAY, VALID_CPF, [item1, item2])).not.toThrow();
})

test('Should throw error when CPF is invalid', () => {
    const item1 = new OrderItem(WAREHOUSE_CAMERA, new Decimal(12.5), 1);
    expect(() => new Order(ORDER_CODE, DOUGLAS_BIRTHDAY, '11122211112', [item1])).toThrowError();
})

test('Should throw error when there is no item', () => {
    expect(() => new Order(ORDER_CODE, DOUGLAS_BIRTHDAY, VALID_CPF, [])).toThrowError('Order must have at least one item');
})

test('Should have price 300 when there is a total of 100 in items and freight is 200', () => {
    const item1 = new OrderItem(WAREHOUSE_CAMERA, new Decimal(25), 2);
    const item2 = new OrderItem(WAREHOUSE_FRIDGE, new Decimal(50), 1);
    const freight = Sinon.stub(FreightMother.createTenCamerasFromDouglasToRubens());
    const order = new Order(ORDER_CODE, DOUGLAS_BIRTHDAY, VALID_CPF, [item1, item2]);
    freight.calculatePrice.returns(new Decimal(200))
    expect(order.calculateTotalPrice(freight)).toStrictEqual(new Decimal(300));
})

test('Should have price 80 when total is 110 and there is a coupon for 30%', () => {
    const item1 = new OrderItem(WAREHOUSE_CAMERA, new Decimal(50), 1);
    const item2 = new OrderItem(WAREHOUSE_FRIDGE, new Decimal(50), 1);
    const coupon = new Coupon('d1', new Decimal('0.3'), DateTime.fromISO('2022-01-01'));
    const freight = Sinon.stub(FreightMother.createTenCamerasFromDouglasToRubens());
    const order = new Order(ORDER_CODE, DOUGLAS_BIRTHDAY, VALID_CPF, [item1, item2]);
    freight.calculatePrice.returns(new Decimal(10))
    expect(order.calculateTotalPrice(freight, coupon)).toStrictEqual(new Decimal(80));
})


test('Should be error when there are multiple items of same warehouse items', () => {
    const item1 = new OrderItem(WAREHOUSE_CAMERA, new Decimal(50), 1);
    const item2 = new OrderItem(WAREHOUSE_CAMERA, new Decimal(50), 1);
    expect(() => new Order(ORDER_CODE, DOUGLAS_BIRTHDAY, VALID_CPF, [item1, item2])).toThrowError('There shouldn\'t be more than one item of the same product')
})