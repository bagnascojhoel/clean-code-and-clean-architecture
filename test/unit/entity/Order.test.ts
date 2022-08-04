import Sinon from 'sinon';
import Order from '../../../src/domain/entity/order/Order';
import OrderCode from '../../../src/domain/entity/order/OrderCode';
import OrderItem from '../../../src/domain/entity/order/OrderItem';

import DateTimeMother from '../../object-mother/DateTimeMother';

const VALID_CPF: string = '80700816003'
const DOUGLAS_BIRTHDAY = DateTimeMother.createDouglasBirthdayAt2022()
const ORDER_CODE = new OrderCode(1, 2022)

afterEach(() => {
    Sinon.restore();
})

test('Should create when all parameters are valid', () => {
    const item1 = new OrderItem(123, 1);
    const item2 = new OrderItem(456, 23);
    expect(() => new Order(ORDER_CODE, DOUGLAS_BIRTHDAY, VALID_CPF, [item1, item2])).not.toThrow();
})

test('Should throw error when CPF is invalid', () => {
    const item1 = new OrderItem(123, 1);
    expect(() => new Order(ORDER_CODE, DOUGLAS_BIRTHDAY, '11122211112', [item1])).toThrowError();
})

test('Should throw error when there is no item', () => {
    expect(() => new Order(ORDER_CODE, DOUGLAS_BIRTHDAY, VALID_CPF, [])).toThrowError('Order must have at least one item');
})

test('Should be error when there are multiple items of same warehouse items', () => {
    const item1 = new OrderItem(123, 1);
    const item2 = new OrderItem(123, 1);
    expect(() => new Order(ORDER_CODE, DOUGLAS_BIRTHDAY, VALID_CPF, [item1, item2])).toThrowError('There shouldn\'t be more than one item of the same product')
})

test('Should set aborted date time when aborting order', () => {
    const item1 = new OrderItem(123, 1);
    const order = new Order(ORDER_CODE, DOUGLAS_BIRTHDAY, VALID_CPF, [item1]);
    order.cancel(DateTimeMother.createDouglasBirthdayAt2022())
    expect(order.cancelledAt).toEqual(DateTimeMother.createDouglasBirthdayAt2022())
}) 