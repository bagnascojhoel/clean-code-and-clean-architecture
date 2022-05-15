import WarehouseItem from "../src/WarehouseItem";
import PhysicalAttributesMother from "./objectmothers/PhysicalAttributesMother";

const PHYSICAL_ATTRIBUTES = PhysicalAttributesMother.createCamera();

test('Should be created when all parameters are valid', () => {
    expect(() => new WarehouseItem(123, 'An item', 10, PHYSICAL_ATTRIBUTES)).not.toThrowError();
})