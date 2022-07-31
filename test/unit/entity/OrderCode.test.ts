import OrderCode from "../../../src/domain/entity/order/OrderCode"

it('Should have value 202200000001 when sequential is 1 and creation year is 2022', () => {
    const actual = new OrderCode(1, 2022)
    expect(actual.value).toBe('202200000001')
})

it('Should throw error when sequentialId is negative', () => {
    expect(() => new OrderCode(-1, 2022)).toThrowError('Order code must have a non-negative sequential ID')
})

it('Should throw error when creationYear is negative', () => {
    expect(() => new OrderCode(1, -1)).toThrowError('Order code must have a non-negative creation year')
})

it('Should throw error when sequentialId is greater than maximum length 8', () => {
    expect(() => new OrderCode(999999990, 2022)).toThrowError('Order code cannot handle this too large sequential ID')
})

it('Should be OrderCode with given value', () => {
    expect(OrderCode.fromValue('ABC1234').value).toBe('ABC1234')
})