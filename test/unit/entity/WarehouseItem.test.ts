
import Decimal from "decimal.js";
import WarehouseItem from "../../../src/domain/entity/WarehouseItem";
import PhysicalAttributesMother from "../../object-mother/PhysicalAttributesMother";

const PHYSICAL_ATTRIBUTES = PhysicalAttributesMother.createCamera();

it('Should be created when all parameters are valid', () => {
    expect(() => new WarehouseItem(123, 'An item', 10, new Decimal(14), PHYSICAL_ATTRIBUTES)).not.toThrowError();
})

it('Should throw error when trying to remove more items than available on stock', () => {
    const warehouseItem = new WarehouseItem(123, 'Item', 10, new Decimal(5), PHYSICAL_ATTRIBUTES)
    expect(() => warehouseItem.removeFromStock(11)).toThrowError('Cannot remove 11 units from stock, there are only 10 available')
})

it('Should be 1 quantity on stock when removing 9 out of 10 available', () => {
    const warehouseItem = new WarehouseItem(123, 'Item', 10, new Decimal(5), PHYSICAL_ATTRIBUTES)
    warehouseItem.removeFromStock(9)
    expect(warehouseItem.quantityOnStock).toBe(1)
})

it('Should be 0 quantity on stock when removing 10 out of 10 available', () => {
    const warehouseItem = new WarehouseItem(123, 'Item', 10, new Decimal(5), PHYSICAL_ATTRIBUTES)
    warehouseItem.removeFromStock(10)
    expect(warehouseItem.quantityOnStock).toBe(0)
})