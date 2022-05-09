import WarehouseItem from "../src/WarehouseItem";

test('Should be created successfully when all parameters are valid', () => {
    expect(() => new WarehouseItem(123, 'An item', 10)).not.toThrowError();
})